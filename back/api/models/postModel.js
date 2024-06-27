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
            let sql = `SELECT * FROM posts`;

            const values = [];
            const whereClauses = [];
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
            sql += " ORDER BY Create_post DESC";

            // Utiliser la même requête sans limit ni offset pour obtenir le total des résultats
            this.total = (await this.getTotal(sql, values.slice(0, values.length - (limitClause ? 1 : 0) - (offsetClause ? 1 : 0)))).total;

            // Ajouter limit et offset à la requête principale
            sql += limitClause + offsetClause;

            // Exécuter la requête avec les valeurs
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
            const sql = `INSERT INTO posts (Title, Content, Id_PostAnswer, Id_topics, Id_User) VALUES (? ,?, ?, ?, ?)`;
            connection.query(sql, [newpost.Content, newpost.Id_PostAnswer, newpost.Id_topics, newpost.Id_User], (err, results)=> err ? reject(err) : resolve(results[0]));
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
            connection.query(countSql, values, (err, results) =>
                err ? reject(err) : resolve(results[0])
            );
        });
    }
}

module.exports = postModel;