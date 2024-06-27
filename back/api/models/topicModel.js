const connection = require("../config/authBDD")

class topicModel {
    total = 0;

    static getTopicByName(title) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT t.Id        AS TopicId,
                       t.Title,
                       t.Path      AS TopicPath,
                       t.Create_at,
                       t.Id_User,
                       u2.Name    AS UserName,
                       u2.Path    AS UserPath,
                       s.Label     AS Status,
                       tags.Id     AS TagId,
                       tags.Path   AS TagPath,
                       tags.Label  AS TagLabel,
                       p.Id        AS PostId,
                       p.Title     AS PostTitle,
                       p.Create_post,
                       p.Content,
                       u.Name      AS UserNamePost,
                       u.Path      AS UserPathPost,
                       u.Id        AS UserIdPost,
                       SUM(CASE
                               WHEN lp.Like = 1 THEN 1
                               WHEN lp.Like = 0 THEN -1
                               ELSE 0
                           END)    AS PostLikes,
                       COUNT(m.Id) AS MessageCount

                FROM topics t
                         LEFT JOIN status s ON t.Id_Status = s.Id
                         LEFT JOIN users u2 ON t.Id_User = u2.Id
                         LEFT JOIN tagstopics tp ON t.Id = tp.Id_topics
                         LEFT JOIN tags ON tp.Id_Tag = tags.Id
                         LEFT JOIN posts p ON t.Id = p.Id_topics
                         LEFT JOIN message m ON p.Id = m.Id_PostAnswer
                         LEFT JOIN likepost lp on p.Id = lp.Id_Post
                         LEFT JOIN users u ON p.Id_User = u.Id
                WHERE t.Title = ?;
            `
            connection.query(sql, [title], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve(null);
                }

                const user = {
                    UserName: results[0].UserName,
                    UserPath: results[0].UserPath,
                    UserId: results[0].Id_User,
                    TopicId: results[0].TopicId,
                    Title: results[0].Title,
                    TopicPath: results[0].TopicPath,
                    Create_at: results[0].Create_at,
                    Status: results[0].Status,
                    Posts: []
                };

                results.forEach(row => {
                    user.Posts.push({
                        UserName : row.UserNamePost,
                        UserPath : row.UserPathPost,
                        UserId : row.UserIdPost,
                        PostId: row.PostId,
                        PostTitle: row.PostTitle,
                        Create_post: row.Create_post,
                        Content: row.Content,
                        PostLikes: row.PostLikes,
                        MessageCount: row.MessageCount
                    });
                });

                resolve(user);
            });
        });
    }

    static getAllTopic(query) {
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT *
                       FROM topics `

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

            // Utilise la même requête sans limit ni offset
            this.total = (await this.getTotal(sql, values.slice(0, values.length - (limitClause ? 1 : 0) - (offsetClause ? 1 : 0)))).total;

            // Ajouter limit et offset à la requête principale
            sql += limitClause + offsetClause;

            // Exécuter la requête avec les valeurs
            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static getTags() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT Label, Path
                         FROM tags`;
            connection.query(sql, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static createTopic(newTopic) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO topics (Title, Id_Status, Id_User)
                         VALUES (?, ?, ?)`;

            connection.query(sql, [newTopic.Title, newTopic.Status === 'Public' ? 1 : 2, newTopic.Id_User], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchTopic(id, updateTopic) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE topics
                       SET `;
            const values = [];

            Object.entries(updateTopic).forEach(([key, value], index, entries) => {
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

    static deleteTopic(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                         FROM topics
                         WHERE Id = ?`
            connection.query(sql, [id], (err, results) => err ? reject(err) : resolve(results[0]))

        })
    }

    static getTotal(sql, values) {
        return new Promise((resolve, reject) => {
            const countSql = `SELECT COUNT(*) AS total
                              FROM (${sql}) AS subquery`;
            connection.query(countSql, values, (err, results) =>
                err ? reject(err) : resolve(results[0])
            );
        });
    }
}

module.exports = topicModel;