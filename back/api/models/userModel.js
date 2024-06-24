const connection = require("../config/authBDD")

class userModel {

    static login(email = null, username = null) {
        return new Promise((resolve, reject) => {
            let sql
            if (email) {
                sql = `SELECT *
                       FROM users
                       WHERE Email = ?`;//Car email unique
                connection.query(sql, email, (err, results) => err ? reject(err) : resolve(results[0]));
            } else {
                sql = `SELECT *
                       FROM users
                       WHERE Name = ?`;
                connection.query(sql, username, (err, results) => err ? reject(err) : resolve(results[0]));
            }
        });
    }

    static register(user) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (Name, Email, Password, Salt, Create_at)
                         VALUES (?, ?, ?, ?, DEFAULT)`;
            console.log(sql)
            console.log(user)
            connection.query(sql, [user.username, user.email, user.Password.hashedPassword, user.Password.salt], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
                         FROM users
                         WHERE Email = ?`;
            connection.query(sql, [email], (err, results) => err ? reject(err) : resolve(results[0]));
        })
    }

    static getUserById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u.Id,
                       u.Name,
                       u.Biography,
                       u.Email,
                       u.Path,
                       u.Create_at,
                       r.Label AS Role,
                       t.Path  AS Tag
                FROM users u
                         LEFT JOIN role r ON u.Id_role = r.Id
                         LEFT JOIN userstags ON u.Id = userstags.Id_User
                         LEFT JOIN tags t ON userstags.Id_Tag = t.Id
                WHERE u.Id = ?;
            `;
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve(null);
                }

                const user = {
                    Id: results[0].Id,
                    Name: results[0].Name,
                    Biography: results[0].Biography,
                    Email: results[0].Email,
                    Path: results[0].Path,
                    Create_at: results[0].Create_at,
                    Role: results[0].Role,
                    Tags: []
                };

                results.forEach(row => {
                    if (row.Tag)
                        user.Tags.push(row.Tag);
                });

                resolve(user);
            });
        });
    }

    static setPassword(password, id) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users
                         SET Password = ?,
                             Salt     = ?
                         WHERE Id = ?;`;
            connection.query(sql, [password.hashedPassword, password.salt, id], (err, results) => err ? reject(err) : resolve(results[0]));
        })
    }

    static updatePatchUser(id, updateUser) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE users
                       SET `;
            const values = [];

            Object.entries(updateUser).forEach(([key, value], index, entries) => {
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

    static getFriends(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u2.Id,
                       u2.Name,
                       u2.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u1.Id = ?
                  AND f.status = 'friend'`;
            connection.query(sql, id, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static getPostMessage(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT p.Id          AS PostId,
                       p.Content     AS PostContent,
                       p.Create_post AS CreateAt,
                       p.Id_User     AS UserId,
                       'post'        AS Type,
                       lp.Like       AS PostLike,
                       t.Title       AS TopicTitle,
                       t.Id          AS TopicId
                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN likepost lp ON p.Id = lp.Id_Post
                WHERE p.Id_User = ?
                GROUP BY p.Id, t.Title

                UNION ALL

                SELECT m.Id             AS MessageId,
                       m.Content        AS MessageContent,
                       m.Create_message AS CreateAt,
                       m.Id_User        AS UserId,
                       'message'        AS Type,
                       t.Title          AS TopicTitle,
                       t.Id             AS TopicId,
                       NULL
                FROM message m
                         LEFT JOIN posts p ON m.Id_PostAnswer = p.Id
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                WHERE m.Id_User = ?

                ORDER BY CreateAt;

            `;
            connection.query(sql, [id, id], (err, results) => err ? reject(err) : resolve(results))
        })
    }


    static search(search) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT t.*
                FROM topics t
                WHERE (t.Title LIKE ?)`
            connection.query(sql, search, (err, results) => err ? reject(err) : resolve(results));
        })
    }
}

module.exports = userModel;