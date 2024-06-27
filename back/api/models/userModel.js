const connection = require("../config/authBDD")

class userModel {
    /**
     * This static method logs in a user.
     *
     * @param {string} email - The email of the user.
     * @param {string} username - The username of the user.
     * @returns {Promise} - A promise that resolves with the user's data.
     */
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

    /**
     * This static method registers a user.
     *
     * @param {Object} user - The user's data.
     * @returns {Promise} - A promise that resolves with the user's data.
     */
    static register(user) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (Name, Email, Password, Salt)
                         VALUES (?, ?, ?, ?)`;
            connection.query(sql, [user.username, user.email, user.Password.hashedPassword, user.Password.salt], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    /**
     * This static method retrieves a user by their email from the database.
     *
     * @param {string} email - The email of the user.
     * @returns {Promise} - A promise that resolves with the user's data.
     */
    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
                         FROM users
                         WHERE Email = ?`;
            connection.query(sql, [email], (err, results) => err ? reject(err) : resolve(results[0]));
        })
    }

    /**
     * This static method retrieves a user by their ID from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the user's data.
     */
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

    /**
     * This static method retrieves a user by their name from the database.
     *
     * @param {string} name - The name of the user.
     * @returns {Promise} - A promise that resolves with the user's data.
     */
    static getUserByName(name) {
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
                WHERE u.Name = ?;
            `;
            connection.query(sql, [name], (err, results) => {
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

    /**
     * This static method updates the password of a user in the database.
     *
     * @param {string} password - The new password of the user.
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves when the password is updated.
     */
    static setPassword(password, id) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE users
                         SET Password = ?,
                             Salt     = ?
                         WHERE Id = ?;`;
            connection.query(sql, [password.hashedPassword, password.salt, id], (err, results) => err ? reject(err) : resolve(results[0]));
        })
    }

    /**
     * This static method updates a user in the database.
     *
     * @param {number} id - The ID of the user.
     * @param {Object} updateUser - An object containing the fields to update.
     * @returns {Promise} - A promise that resolves when the user is updated.
     */
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

    /**
     * This static method retrieves the friends of a user from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the friends of the user.
     */
    static getFriends(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT CASE
                           WHEN u1.Id = ? THEN u2.Id
                           WHEN u2.Id = ? THEN u1.Id
                           END AS Id,
                       CASE
                           WHEN u1.Id = ? THEN u2.Name
                           WHEN u2.Id = ? THEN u1.Name
                           END AS Name,
                       CASE
                           WHEN u1.Id = ? THEN u2.Path
                           WHEN u2.Id = ? THEN u1.Path
                           END AS Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE (u1.Id = ? OR u2.Id = ?)
                  AND f.status = 'friend'

            `;
            connection.query(sql, [id, id, id, id, id, id, id, id], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * This static method retrieves the users who follow a user from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the followers of the user.
     */
    static getFollow(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u1.Id,
                       u1.Name,
                       u1.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u2.Id = ?
                  AND f.status = 'waiting'`;
            connection.query(sql, id, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * This static method retrieves the friends of a user from the database by their name.
     *
     * @param {string} name - The name of the user.
     * @returns {Promise} - A promise that resolves with the friends of the user.
     */
    static getFriendsName(name) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT CASE
                           WHEN u1.Name = ? THEN u2.Id
                           WHEN u2.Name = ? THEN u1.Id
                           END AS Id,
                       CASE
                           WHEN u1.Name = ? THEN u2.Name
                           WHEN u2.Name = ? THEN u1.Name
                           END AS Name,
                       CASE
                           WHEN u1.Name = ? THEN u2.Path
                           WHEN u2.Name = ? THEN u1.Path
                           END AS Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE (u1.Name = ? OR u2.Name = ?)
                  AND f.status = 'friend'

            `;
            connection.query(sql, [name, name, name, name, name, name, name, name], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * This static method retrieves the users who follow a user from the database by their name.
     *
     * @param {string} name - The name of the user.
     * @returns {Promise} - A promise that resolves with the followers of the user.
     */
    static getFollowName(name) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u1.Id,
                       u1.Name,
                       u1.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u2.Name = ?
                  AND f.status = 'waiting'`;
            connection.query(sql, name, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static follow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO friendship (Id_User1, Id_User2)
                         VALUES (?, ?)`;
            connection.query(sql, [idUser1, idUser2], (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static unfollow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `
                DELETE
                FROM friendship
                WHERE Id_User1 = ? AND Id_User2 = ?;`;
            connection.query(sql, [idUser1, idUser2], (err, results) => {
                if (err){
                    console.log(err)
                    reject(err)
                }
                const sql2 = `
                UPDATE friendship
                SET status = 'waiting'
                WHERE Id_User1 = ? AND Id_User2 = ?;`
                console.log(sql)
                console.log(idUser1, idUser2)
                connection.query(sql2, [idUser2, idUser1], (err, results2) => err ? resolve(results) : resolve({results, results2}));
            });
        });
    }

    static acceptFollow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE friendship
                SET status = 'friend'
                WHERE (Id_User1 = ? AND Id_User2 = ?);`
            connection.query(sql, [idUser2, idUser1], (err, results) => {
                if (err){
                    reject(err)
                }
                const sql2 = `
                    INSERT INTO friendship (Id_User1, Id_User2, status)
                    VALUES (?, ?, 'friend');`
                connection.query(sql2, [idUser1, idUser2], (err, results2) => err ? reject(err) : resolve({results, results2}));
            });
        });
    }

    /**
     * This static method retrieves the posts and messages of a user from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the posts and messages of the user.
     */
    static getPostMessage(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT p.Id          AS PostId,
                       p.Title       AS PostTitle,
                       p.Content     AS PostContent,
                       p.Create_post AS CreateAt,
                       p.Id_User     AS UserId,
                       'post'        AS Type,
                       SUM(CASE
                               WHEN lp.Like = 1 THEN 1
                               WHEN lp.Like = 0 THEN -1
                               ELSE 0
                           END)      AS PostLikes,
                       t.Title       AS TopicTitle,
                       t.Path        AS TopicPath,
                       t.Id          AS TopicId
                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN likepost lp ON p.Id = lp.Id_Post
                         LEFT JOIN users u ON p.Id_User = u.Id
                WHERE p.Id_User = ?
                GROUP BY p.Id, t.Title

                UNION ALL

                SELECT m.Id             AS MessageId,
                       NULL             AS MessageTitle,
                       m.Content        AS MessageContent,
                       m.Create_message AS CreateAt,
                       m.Id_User        AS UserId,
                       'message'        AS Type,
                       NULL             AS MessageLikes,
                       t.Title          AS TopicTitle,
                       t.Path           AS TopicPath,
                       t.Id             AS TopicId
                FROM message m
                         LEFT JOIN posts p ON m.Id_PostAnswer = p.Id
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN users u ON m.Id_User = u.id
                WHERE m.Id_User = ?

                ORDER BY CreateAt;

            `;
            connection.query(sql, [id, id], (err, results) => err ? reject(err) : resolve(results))
        })
    }

    /**
     * Retrieves the posts and messages of a user from the database by their name.
     *
     * @param {string} name - The name of the user.
     * @returns {Promise} - A promise that resolves with the posts and messages of the user.
     */
    static getPostMessageName(name) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT p.Id          AS PostId,
                       p.Title       AS PostTitle,
                       p.Content     AS PostContent,
                       p.Create_post AS CreateAt,
                       p.Id_User     AS UserId,
                       'post'        AS Type,
                       SUM(CASE
                               WHEN lp.Like = 1 THEN 1
                               WHEN lp.Like = 0 THEN -1
                               ELSE 0
                           END)      AS PostLikes,
                       t.Title       AS TopicTitle,
                       t.Path        AS TopicPath,
                       t.Id          AS TopicId
                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN likepost lp ON p.Id = lp.Id_Post
                         LEFT JOIN users u ON p.Id_User = u.Id
                WHERE u.Name = ?
                GROUP BY p.Id, t.Title

                UNION ALL

                SELECT m.Id             AS MessageId,
                       NULL             AS MessageTitle,
                       m.Content        AS MessageContent,
                       m.Create_message AS CreateAt,
                       m.Id_User        AS UserId,
                       'message'        AS Type,
                       NULL             AS MessageLikes,
                       t.Title          AS TopicTitle,
                       t.Path           AS TopicPath,
                       t.Id             AS TopicId
                FROM message m
                         LEFT JOIN posts p ON m.Id_PostAnswer = p.Id
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN users u ON m.Id_User = u.id
                WHERE u.Name = ?

                ORDER BY CreateAt;
            `;
            connection.query(sql, [name, name], (err, results) => err ? reject(err) : resolve(results))
        });
    }

    /**
     * This static method searches for users friends by their name in the database.
     *
     * @param {string} search - The search query.
     * @returns {Promise} - A promise that resolves with the search results.
     */
    static searchFriend(search) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT CASE
                           WHEN u1.Name = ? THEN u2.Id
                           WHEN u2.Name = ? THEN u1.Id
                           END AS Id,
                       CASE
                           WHEN u1.Name = ? THEN u2.Name
                           WHEN u2.Name = ? THEN u1.Name
                           END AS Name,
                       CASE
                           WHEN u1.Name = ? THEN u2.Path
                           WHEN u2.Name = ? THEN u1.Path
                           END AS Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE (u1.Name LIKE ? OR u2.Name LIKE ?)
                  AND f.status = 'friend'
            `
            connection.query(sql, [search, search, search, search, search, search, search, search], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * This static method searches for users follow by their name in the database.
     *
     * @param {string} search - The search query.
     * @returns {Promise} - A promise that resolves with the search results.
     */
    static searchFollow(search) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u1.Id,
                       u1.Name,
                       u1.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u2.Name LIKE ?
                  AND f.status = 'waiting'
            `
            connection.query(sql, [search], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static getAdminModo() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u.Id,
                       u.Name,
                       u.Path,
                       r.Label AS Role
                FROM users u
                         LEFT JOIN role r ON u.Id_role = r.Id
                WHERE u.Id_role = 1
                   OR u.Id_role = 2;
            `
            connection.query(sql, (err, results) => err ? reject(err) : resolve(results));
        })
    }

}

module.exports = userModel;