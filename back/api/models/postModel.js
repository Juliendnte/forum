const connection = require("../config/authBDD")

class postModel{

    total = 0;
    static getpostById(id){
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    p.*,
                    u.Name,
                    u.Path,
                    u.Id AS Id_User,
                    r.Label AS Role,
                    SUM(CASE
                            WHEN lp.Like = 1 THEN 1
                            WHEN lp.Like = 0 THEN -1
                            ELSE 0
                        END) AS  PostLikes,
                    COUNT(m.Id) AS MessageCount
                    
                FROM posts p
                LEFT JOIN users u ON p.Id_User = u.Id
                LEFT JOIN role r ON u.Id_role = r.Id
                LEFT JOIN likepost lp ON lp.Id_Post = p.Id
                LEFT JOIN message m ON p.Id = m.Id_PostAnswer
                WHERE p.Id = ?
                GROUP BY
                    p.Id,
                    u.Name,
                    r.Label`
            connection.query(sql,[id], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static getAllpost(query){
        return new Promise(async (resolve, reject) => {

            let sql = `SELECT posts.Id AS PostId, posts.Title, posts.Content, posts.Create_post, posts.Id_topics, posts.Id_User, posts.Id_PostAnswer,
                              t.Id AS TopicId, t.Title AS TopicTitle, t.Path, t.Create_at, t.Id_User AS TopicUserId, s.Label AS Status
                       FROM posts
                                LEFT JOIN topics t ON posts.Id_topics = t.Id
                                LEFT JOIN status s ON t.Id_Status = s.Id`;

            const values = [];
            const whereClauses = ['t.Id_Status = 1'];
            let limitClause = "";
            let offsetClause = "";

            // Construire les clauses WHERE, LIMIT et OFFSET
            Object.entries(query).forEach(([key, value]) => {
                if (key.toLowerCase() === "limit") {
                    limitClause = ` LIMIT ?`;
                    values.push(parseInt(value));
                } else if (key.toLowerCase() === "offset") {
                    offsetClause = ` OFFSET ?`;
                    values.push(parseInt(value));
                } else {
                    const valuesArray = value.split(",");
                    const placeholders = valuesArray.map(() => "?").join(",");
                    whereClauses.push(valuesArray.length > 1 ? `${key} IN (${placeholders})` : `${key} = ?`);
                    values.push(...valuesArray);
                }
            });

            // Ajouter les clauses WHERE à la requête SQL
            if (whereClauses.length > 0) {
                sql += " WHERE " + whereClauses.join(" AND ");
            }

            // Ajouter la clause ORDER BY pour trier par la date de création la plus récente

            // Utiliser la même requête sans limit ni offset pour obtenir le total des résultats
            this.total = (await this.getTotal(sql, values.slice(0, values.length - (limitClause ? 1 : 0) - (offsetClause ? 1 : 0)))).total;
            sql += " ORDER BY Create_post DESC";
            console.log(sql, values);

            // Ajouter limit et offset à la requête principale
            sql += limitClause + offsetClause;
            // Exécuter la requête avec les valeurs
            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static getAllpostMiddleware(query, id) {
        return new Promise(async (resolve, reject) => {
            let sql = `
            SELECT p.*,
                   s.Label AS Status
            FROM posts p
            JOIN topics t ON p.Id_topics = t.Id
            LEFT JOIN status s ON t.Id_Status = s.Id
            LEFT JOIN friendship f ON (
                (f.Id_User1 = ? AND f.Id_User2 = p.Id_User AND f.status = 'friend') OR
                (f.Id_User2 = ? AND f.Id_User1 = p.Id_User AND f.status = 'friend')
            )
        `;

            const values = [id, id];
            const whereClauses = ["(t.Id_Status != 1 OR f.status = 'friend' OR p.Id_User = ?)"];
            let limitClause = "";
            let offsetClause = "";

            // Include the current user ID for the private topic check
            values.push(id);

            // Build WHERE, LIMIT, and OFFSET clauses
            Object.entries(query).forEach(([key, value]) => {
                if (key.toLowerCase() === "limit") {
                    limitClause = ` LIMIT ?`;
                    values.push(parseInt(value));
                } else if (key.toLowerCase() === "offset") {
                    offsetClause = ` OFFSET ?`;
                    values.push(parseInt(value));
                } else {
                    const valuesArray = value.split(",");
                    const placeholders = valuesArray.map(() => "?").join(",");
                    whereClauses.push(valuesArray.length > 1 ? `${key} IN (${placeholders})` : `${key} = ?`);
                    values.push(...valuesArray);
                }
            });

            // Add WHERE clauses to the SQL query
            if (whereClauses.length > 0) {
                sql += " WHERE " + whereClauses.join(" AND ");
            }


            // Use the same query without limit and offset to get the total number of results
            this.total = (await this.getTotal(sql, values.slice(0, values.length - (limitClause ? 1 : 0) - (offsetClause ? 1 : 0)))).total;

            // Add ORDER BY clause to sort by creation date in descending order
            sql += " ORDER BY p.Create_post DESC";
            // Add LIMIT and OFFSET clauses to the main query
            sql += limitClause + offsetClause;

            // Execute the query with the values
            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static likepost(like){
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO likepost (Id_User, Id_Post, \`Like\`)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE \`Like\` = VALUES(\`Like\`);`;
            connection.query(sql, [like.Id_User, like.Id_Post, like.Like], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    static createpost(newpost){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO posts (Title, Content, Id_topics, Id_User) VALUES (?, ?, ?, ?)`;
            connection.query(sql, [newpost.Title, newpost.Content, newpost.Id_topics, newpost.Id_User], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchpost(id, updatepost){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE posts SET `;
            const values = [];

            /*
            entries est l'objet en liste de liste
            [
                ["Name","Julien],
                ["Project","Boutique"]
            ]
             */
            Object.entries(updatepost).forEach(([key, value], index, entries) => {
                sql += `${key}=?`;
                values.push(value);
                if (index < entries.length - 1) {
                    sql += `, `;
                }
            });
            sql += ` WHERE id=?`;
            values.push(id);

            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    static getLike(id, iduser){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM likepost WHERE Id_Post = ? AND Id_User = ?`
            connection.query(sql,[id, iduser], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static deletepost(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM posts WHERE Id=?`
            connection.query(sql,[id], (err,results)=> err ? reject(err) : resolve(results[0]))

        })
    }

    static getTotal(sql, values) {
        return new Promise((resolve, reject) => {
            const countSql = `SELECT COUNT(*) AS total FROM (${sql}) AS subquery`;
            console.log(countSql, values);
            connection.query(countSql, values, (err, results) =>
                err ? reject(err) : resolve(results[0])
            );
        });
    }
}

module.exports = postModel;