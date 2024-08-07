const connection = require("../config/authBDD")
const lstvalues = ['Id', 'Name', 'Biography', 'Email', 'Path', 'Create_at']

/**
 * Class representing a model for user.
 */
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
                if (lstvalues.includes(key)) {
                    sql += `${key}=?`;
                    values.push(value);
                    if (index < entries.length - (updateUser.Tags ? 2 : 1)) {
                        sql += `, `;
                    }
                }
            });
            sql += ` WHERE id=?`;
            values.push(id);

            connection.query(sql, values, (err, results) => {

                if (updateUser.Tags && Array.isArray(updateUser.Tags)) {
                    const deleteTagsSql = `DELETE
                                           FROM userstags
                                           WHERE Id_User = ?`;
                    connection.query(deleteTagsSql, [id], (err) => {
                        if (err) {
                            return reject(err);
                        }

                        if (updateUser.Tags.length === 0) {
                            return resolve(results);
                        }

                        const insertTagsSql = `INSERT INTO userstags (Id_User, Id_Tag)
                                               VALUES ?`;
                        const tagsValues = updateUser.Tags.map(tagId => [id, tagId]);

                        connection.query(insertTagsSql, [tagsValues], (err) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve(results);
                        });
                    });
                } else {
                    resolve(results);
                }
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
                SELECT p.Id                            AS Id,
                       p.Title                         AS Title,
                       p.Content                       AS Content,
                       p.Create_post                   AS CreateAt,
                       p.Id_User                       AS UserId,
                       'post'                          AS Type,
                       SUM(CASE
                               WHEN lp.Like = 1 THEN 1
                               WHEN lp.Like = 0 THEN -1
                               ELSE 0
                           END)                        AS PostLikes,
                       t.Title                         AS TopicTitle,
                       t.Path                          AS TopicPath,
                       t.Id                            AS TopicId,
                       (SELECT COUNT(*)
                        FROM message m2
                        WHERE m2.Id_PostAnswer = p.Id) AS MessageCount
                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN likepost lp ON p.Id = lp.Id_Post
                         LEFT JOIN users u ON p.Id_User = u.Id
                WHERE p.Id_User = ?
                GROUP BY p.Id, p.Title, p.Content, p.Create_post, p.Id_User, t.Title, t.Path, t.Id

                UNION ALL

                SELECT m.Id                               AS Id,
                       NULL                               AS Title,
                       m.Content                          AS Content,
                       m.Create_message                   AS CreateAt,
                       m.Id_User                          AS UserId,
                       'message'                          AS Type,
                       NULL                               AS MessageLikes,
                       t.Title                            AS TopicTitle,
                       t.Path                             AS TopicPath,
                       t.Id                               AS TopicId,
                       (SELECT COUNT(*)
                        FROM message m2
                        WHERE m2.Id_MessageAnswer = m.Id) AS MessageCount
                FROM message m
                         LEFT JOIN posts p ON m.Id_PostAnswer = p.Id
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN users u ON m.Id_User = u.id
                WHERE m.Id_User = ?
                ORDER BY CreateAt;
            `;
            connection.query(sql, [id, id], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve([]);
                }

                const posts = results.map(row => {
                    if (row.Type === 'post') {
                        return {
                            PostId: row.Id,
                            PostTitle: row.Title,
                            PostContent: row.Content,
                            CreateAt: row.CreateAt,
                            UserId: row.UserId,
                            Type: row.Type,
                            PostLikes: row.PostLikes,
                            MessageCount: row.MessageCount,
                            Topic: {
                                Title: row.TopicTitle,
                                Path: row.TopicPath,
                                Id: row.TopicId
                            }
                        };
                    } else {
                        return {
                            MessageId: row.Id,
                            MessageContent: row.Content,
                            CreateAt: row.CreateAt,
                            UserId: row.UserId,
                            Type: row.Type,
                            MessageCount: row.MessageCount,
                            Topic: {
                                Title: row.TopicTitle,
                                Path: row.TopicPath,
                                Id: row.TopicId
                            }
                        };
                    }
                });
                resolve(posts);
            });
        });
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
                SELECT p.Id                            AS Id,
                       p.Title                         AS Title,
                       p.Content                       AS Content,
                       p.Create_post                   AS CreateAt,
                       p.Id_User                       AS UserId,
                       'post'                          AS Type,
                       SUM(CASE
                               WHEN lp.Like = 1 THEN 1
                               WHEN lp.Like = 0 THEN -1
                               ELSE 0
                           END)                        AS PostLikes,
                       t.Title                         AS TopicTitle,
                       t.Path                          AS TopicPath,
                       t.Id                            AS TopicId,
                       (SELECT COUNT(*)
                        FROM message m2
                        WHERE m2.Id_PostAnswer = p.Id) AS MessageCount
                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         INNER JOIN status s ON t.Id_Status = s.Id
                         LEFT JOIN likepost lp ON p.Id = lp.Id_Post
                         LEFT JOIN users u ON p.Id_User = u.Id
                WHERE u.Name = ? AND s.Label NOT LIKE 'Archived'
                GROUP BY p.Id, p.Title, p.Content, p.Create_post, p.Id_User, t.Title, t.Path, t.Id

                UNION ALL

                SELECT m.Id                               AS Id,
                       NULL                               AS Title,
                       m.Content                          AS Content,
                       m.Create_message                   AS CreateAt,
                       m.Id_User                          AS UserId,
                       'message'                          AS Type,
                       NULL                               AS MessageLikes,
                       t.Title                            AS TopicTitle,
                       t.Path                             AS TopicPath,
                       t.Id                               AS TopicId,
                       (SELECT COUNT(*)
                        FROM message m2
                        WHERE m2.Id_MessageAnswer = m.Id) AS MessageCount
                FROM message m
                         LEFT JOIN posts p ON m.Id_PostAnswer = p.Id
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN users u ON m.Id_User = u.id
                WHERE u.Name = ?
                ORDER BY CreateAt;`;
            connection.query(sql, [name, name], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve([]);
                }

                const posts = results.map(row => {
                    if (row.Type === 'post') {
                        return {
                            PostId: row.Id,
                            PostTitle: row.Title,
                            PostContent: row.Content,
                            CreateAt: row.CreateAt,
                            UserId: row.UserId,
                            Type: row.Type,
                            PostLikes: row.PostLikes,
                            MessageCount: row.MessageCount,
                            Topic: {
                                Title: row.TopicTitle,
                                Path: row.TopicPath,
                                Id: row.TopicId
                            }
                        };
                    } else {
                        return {
                            MessageId: row.Id,
                            MessageContent: row.Content,
                            CreateAt: row.CreateAt,
                            UserId: row.UserId,
                            Type: row.Type,
                            MessageCount: row.MessageCount,
                            Topic: {
                                Title: row.TopicTitle,
                                Path: row.TopicPath,
                                Id: row.TopicId
                            }
                        };
                    }
                });
                resolve(posts);
            });
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

    /**
     * This static method search for users, topics, and posts by their name in the database.
     *
     * @param {string} search - The search query.
     * @returns {Promise} - A promise that resolves with the search results.
     */
    static search(search) {
        return new Promise((resolve, reject) => {
            const searchQuery = `%${search}%`;
            const sql = `
                SELECT 'user'      AS Type,
                       u.Id        AS Id,
                       u.Name      AS Title,
                       u.Path      AS Path,
                       u.Create_at AS CreateAt,
                       NULL        AS Content,
                       NULL        AS PostLikes,
                       NULL        AS MessageCount,
                       NULL        AS UserName,
                       NULL        AS UserPath,
                       NULL        AS UserId,
                       NULL        AS TopicId,
                       NULL        AS TopicTitle,
                       NULL        AS TopicPath,
                       NULL        AS TopicCreateAt,
                       NULL        AS TopicUserId,
                       NULL        AS Status
                FROM users u
                WHERE u.Name LIKE ?

                UNION

                SELECT 'post'                                                            AS Type,
                       p.Id                                                              AS Id,
                       p.Title                                                           AS Title,
                       NULL                                                              AS Path,
                       p.Create_post                                                     AS CreateAt,
                       p.Content                                                         AS Content,
                       COALESCE(pl.PostLikes, 0)                                         AS PostLikes,
                       (SELECT COUNT(*) FROM message WHERE message.Id_PostAnswer = p.Id) AS MessageCount,
                       u.Name                                                            AS UserName,
                       u.Path                                                            AS UserPath,
                       u.Id                                                              AS UserId,
                       t.Id                                                              AS TopicId,
                       t.Title                                                           AS TopicTitle,
                       t.Path                                                            AS TopicPath,
                       t.Create_at                                                       AS TopicCreateAt,
                       t.Id_User                                                         AS TopicUserId,
                       s.Label                                                           AS Status
                FROM posts p
                         INNER JOIN users u ON p.Id_User = u.Id
                         INNER JOIN topics t ON p.Id_topics = t.Id
                         INNER JOIN status s ON t.Id_Status = s.Id
                         LEFT JOIN (SELECT lp.Id_Post,
                                           SUM(CASE WHEN lp.Like = 1 THEN 1 WHEN lp.Like = 0 THEN -1 ELSE 0 END) AS PostLikes
                                    FROM likepost lp
                                    GROUP BY lp.Id_Post) pl ON p.Id = pl.Id_Post
                WHERE p.Title LIKE ? AND s.Label NOT LIKE 'Archived'
                GROUP BY p.Id, u.Name, t.Id, s.Label, pl.PostLikes

                UNION

                SELECT 'topic'     AS Type,
                       t.Id        AS Id,
                       t.Title     AS Title,
                       t.Path      AS Path,
                       t.Create_at AS CreateAt,
                       NULL        AS Content,
                       NULL        AS PostLikes,
                       NULL        AS MessageCount,
                       NULL        AS UserName,
                       NULL        AS UserPath,
                       NULL        AS UserId,
                       NULL        AS TopicId,
                       NULL        AS TopicTitle,
                       NULL        AS TopicPath,
                       NULL        AS TopicCreateAt,
                       NULL        AS TopicUserId,
                       NULL        AS Status
                FROM topics t
                INNER JOIN status s ON t.Id_Status = s.Id
                WHERE t.Title LIKE ? AND s.Label NOT LIKE 'Archived'

                ORDER BY CreateAt DESC;

            `;

            connection.query(sql, [searchQuery, searchQuery, searchQuery], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve(null);
                }

                const searchResults = results.map(row => {
                    if (row.Type === 'user') {
                        return {
                            Type: row.Type,
                            Id: row.Id,
                            Title: row.Title,
                            Path: row.Path,
                            CreateAt: row.CreateAt
                        };
                    } else if (row.Type === 'post') {
                        return {
                            Type: row.Type,
                            Post: {
                                Id: row.Id,
                                Title: row.Title,
                                Create_post: row.CreateAt,
                                Content: row.Content,
                                Likes: row.PostLikes,
                                MessageCount: row.MessageCount,
                                User: {
                                    Id: row.UserId,
                                    Name: row.UserName,
                                    Path: row.UserPath
                                }
                            },
                            Topic: {
                                Id: row.TopicId,
                                Title: row.TopicTitle,
                                Path: row.TopicPath,
                                Create_at: row.TopicCreateAt,
                                UserId: row.TopicUserId,
                                Status: row.Status
                            }
                        };
                    } else if (row.Type === 'topic') {
                        return {
                            Type: row.Type,
                            Id: row.Id,
                            Title: row.Title,
                            Path: row.Path,
                            CreateAt: row.CreateAt
                        };
                    }
                });

                resolve(searchResults);
            });
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
                SELECT DISTINCT CASE
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
                SELECT DISTINCT CASE
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

    /**
     * Retrieves the users followed by a specific user from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the users followed by the user.
     */
    static getFollowed(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u2.Id,
                       u2.Name,
                       u2.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u1.Id = ?
                  AND f.status = 'waiting'`;
            connection.query(sql, id, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * Retrieves the users followed by a specific user from the database by their name.
     *
     * @param {string} name - The name of the user.
     * @returns {Promise} - A promise that resolves with the users followed by the user.
     */
    static getFollowedName(name) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT u2.Id,
                       u2.Name,
                       u2.Path
                FROM friendship f
                         LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                         LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                WHERE u1.Name = ?
                  AND f.status = 'waiting'`;
            connection.query(sql, name, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * Follows a user.
     *
     * @param {number} idUser1 - The ID of the user who wants to follow.
     * @param {number} idUser2 - The ID of the user to be followed.
     * @returns {Promise} - A promise that resolves when the user is followed.
     */
    static follow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO friendship (Id_User1, Id_User2)
                         VALUES (?, ?)`;
            connection.query(sql, [idUser1, idUser2], (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static ban(idUser) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                         FROM users
                         WHERE Id = ?`
            connection.query(sql, idUser, (err, results) => err ? reject(err) : resolve(results));
        })
    }

    /**
     * Unfollows a user.
     *
     * @param {number} idUser1 - The ID of the user who wants to unfollow.
     * @param {number} idUser2 - The ID of the user to be unfollowed.
     * @returns {Promise} - A promise that resolves when the user is unfollowed.
     */
    static unfollow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `
                DELETE
                FROM friendship
                WHERE Id_User1 = ?
                  AND Id_User2 = ?;`;
            connection.query(sql, [idUser1, idUser2], (err, results) => {
                if (err) {
                    reject(err)
                }
                const sql2 = `
                    UPDATE friendship
                    SET status = 'waiting'
                    WHERE Id_User1 = ?
                      AND Id_User2 = ?;`
                connection.query(sql2, [idUser2, idUser1], (err, results2) => err ? resolve(results) : resolve({
                    results,
                    results2
                }));
            });
        });
    }

    /**
     * Accepts a follow request.
     *
     * @param {number} idUser1 - The ID of the user who wants to accept the follow request.
     * @param {number} idUser2 - The ID of the user who sent the follow request.
     * @returns {Promise} - A promise that resolves when the follow request is accepted.
     */
    static acceptFollow(idUser1, idUser2) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE friendship
                SET status = 'friend'
                WHERE (Id_User1 = ? AND Id_User2 = ?);`
            connection.query(sql, [idUser2, idUser1], (err, results) => {
                if (err) {
                    reject(err)
                }
                const sql2 = `
                    INSERT INTO friendship (Id_User1, Id_User2, status)
                    VALUES (?, ?, 'friend');`
                connection.query(sql2, [idUser1, idUser2], (err, results2) => err ? reject(err) : resolve({
                    results,
                    results2
                }));
            });
        });
    }


    /**
     * Retrieves the administrators and moderators from the database.
     *
     * @returns {Promise} - A promise that resolves with the administrators and moderators.
     */
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

    /**
     * Retrieves the favorite topics of a user from the database.
     *
     * @param {number} id - The ID of the user.
     * @returns {Promise} - A promise that resolves with the favorite topics of the user.
     */
    static getFav(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 'Topic' AS Type,
                       t.Id,
                       t.Title,
                       t.Content,
                       t.Path,
                       t.Create_at,
                       t.Id_User,
                       s.Label AS Status,
                       NULL    AS TopicTitle,
                       NULL    AS TopicPath,
                       NULL    AS PostLikes,
                       NULL    AS MessageCount
                FROM topics t
                         INNER JOIN status s ON t.Id_Status = s.Id
                         LEFT JOIN tagstopics tp ON t.Id = tp.Id_topics
                         LEFT JOIN tags ON tp.Id_Tag = tags.Id
                         INNER JOIN favtopics ft ON ft.Id_topics = t.Id
                WHERE ft.Id_User = ? AND (s.Label NOT LIKE 'Archived' OR t.Id_User = ?)

                UNION ALL

                SELECT 'Post'                                                            AS Type,
                       p.Id,
                       p.Title,
                       p.Content,
                       NULL                                                              AS Path,
                       p.Create_post,
                       p.Id_User,
                       s.Label                                                           AS Status,
                       t.Title                                                           AS TopicTitle,
                       t.Path                                                            AS TopicPath,
                       COALESCE(pl.PostLikes, 0)                                         AS PostLikes,
                       (SELECT COUNT(*) FROM message WHERE message.Id_PostAnswer = p.Id) AS MessageCount

                FROM posts p
                         LEFT JOIN topics t ON p.Id_topics = t.Id
                         LEFT JOIN status s ON t.Id_Status = s.Id
                         INNER JOIN favposts fp ON fp.Id_Post = p.Id
                         LEFT JOIN (SELECT lp.Id_Post,
                                           SUM(CASE WHEN lp.Like = 1 THEN 1 WHEN lp.Like = 0 THEN -1 ELSE 0 END) AS PostLikes
                                    FROM likepost lp
                                    GROUP BY lp.Id_Post) pl ON p.Id = pl.Id_Post
                WHERE fp.Id_User = ? AND (s.Label NOT LIKE 'Archived' OR p.Id_User = ?)
                `;
            connection.query(sql, [id, id, id, id], (err, results) => err ? reject(err) : resolve(results));
        });
    }

    static getFavIdPost(idUser, id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM favposts
                WHERE Id_User = ?
                  AND Id_Post = ?;
            `
            connection.query(sql, [idUser, id], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static getFavIdTopic(idUser, id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM favtopics
                WHERE Id_User = ?
                  AND Id_topics = ?;
            `
            connection.query(sql, [idUser, id], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static postFavTopic(idUser, idTopic) {
        return new Promise((resolve, reject) => {
            const sql = `  INSERT INTO favtopics(Id_User, Id_topics)
                           VALUES (?, ?)`
            connection.query(sql, [idUser, idTopic], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static deleteFavTopic(idUser, idTopic) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM favtopics WHERE Id_User = ? AND Id_topics = ?'
            connection.query(sql, [idUser, idTopic], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static postFavPost(idUser, Id_Post) {
        return new Promise((resolve, reject) => {
            const sql = `  INSERT INTO favposts(Id_User, Id_Post)
                           VALUES (?, ?)`
            connection.query(sql, [idUser, Id_Post], (err, results) => err ? reject(err) : resolve(results));
        })
    }

    static deleteFavPost(idUser, Id_Post) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM favposts WHERE Id_User = ? AND Id_Post = ?'
            connection.query(sql, [idUser, Id_Post], (err, results) => err ? reject(err) : resolve(results));
        })
    }
}

module.exports = userModel;