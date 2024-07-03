const connection = require("../config/authBDD")

/**
 * Class representing a model for posts.
 */
class postModel {

    /**
     * Total number of post.
     * @type {number}
     */
    total = 0;

    /**
     * Get a post by its ID.
     *
     * @param {number} id - The ID of the post.
     * @returns {Promise} - A promise that resolves with the post.
     */
    static getpostById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    p.Id                                                              AS PostId,
                    p.Title,
                    p.Content,
                    p.Create_post,
                    p.Id_topics,
                    p.Id_User,
                    p.Id_PostAnswer,
                    t.Id                                                                  AS TopicId,
                    t.Title                                                               AS TopicTitle,
                    t.Path,
                    t.Create_at,
                    t.Id_User                                                             AS TopicUserId,
                       u.Name,
                       u.Path,
                       u.Id        AS Id_User,
                       r.Label     AS Role,
                       s.Label                                                               AS Status,

                    SUM(CASE WHEN lp.Like = 1 THEN 1 WHEN lp.Like=0 THEN -1 ELSE 0 END) AS PostLikes,
                       (SELECT COUNT(*) FROM message WHERE message.Id_PostAnswer = p.Id) AS MessageCount

                FROM posts p
                         INNER JOIN topics t ON p.Id_topics = t.Id
                         INNER JOIN users u ON p.Id_User = u.Id
                         INNER JOIN role r ON u.Id_role = r.Id
                         LEFT JOIN likepost lp ON lp.Id_Post = p.Id
                         INNER JOIN message m ON p.Id = m.Id_PostAnswer
                WHERE p.Id = ?
                GROUP BY p.Id`
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const post = {
                    Id: results[0].Id,
                    Title: results[0].Title,
                    Content: results[0].Content,
                    Create_post: results[0].Create_post,
                    Id_topics: results[0].Id_topics,
                    Id_PostAnswer: results[0].Id_PostAnswer,
                    MessageCount: results[0].MessageCount,
                    PostLikes: results[0].PostLikes,
                    User: {
                        Id: results[0].Id_User,
                        Name: results[0].Name,
                        Path: results[0].Path,
                        Role: results[0].Role
                    }
                }
                return resolve(post);
            });
        });
    }

    /**
     * Get all posts based on a query.
     *
     * @param {Object} query - The query parameters.
     * @returns {Promise} - A promise that resolves with the posts.
     */
    static getAllpost(query) {
        return new Promise(async (resolve, reject) => {

            let sql = `SELECT
                           posts.Id                                                              AS PostId,
                           posts.Title,
                           posts.Content,
                           posts.Create_post,
                           posts.Id_topics,
                           posts.Id_User,
                           posts.Id_PostAnswer,
                           t.Id                                                                  AS TopicId,
                           t.Title                                                               AS TopicTitle,
                           t.Path,
                           t.Create_at,
                           t.Id_User                                                             AS TopicUserId,
                           s.Label                                                               AS Status,
                           SUM(CASE WHEN lp.Like = 1 THEN 1 WHEN lp.Like=0 THEN -1 ELSE 0 END) AS PostLikes,
                           (SELECT COUNT(*) FROM message WHERE message.Id_PostAnswer = posts.Id) AS MessageCount

                       FROM
                           posts
                               INNER JOIN topics t ON posts.Id_topics = t.Id
                               INNER JOIN status s ON t.Id_Status = s.Id
                               LEFT JOIN likepost AS lp ON posts.Id = lp.Id_Post`;

            const values = [];
            const whereClauses = ['s.Label = ?'];
            values.push('Public');
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

            // Ajouter GROUP BY et ORDER BY
            sql += ` GROUP BY posts.Id
                 ORDER BY posts.Create_post DESC`;

            // Ajouter limit et offset à la requête principale
            sql += limitClause + offsetClause;
            // Exécuter la requête avec les valeurs
            connection.query(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                const posts = results.map((row) => ({
                    Post: {
                        Id: row.PostId,
                        Title: row.Title,
                        Create_post: row.Create_post,
                        Content: row.Content,
                        Likes: row.PostLikes,
                        MessageCount: row.MessageCount
                    },
                    Topic: {
                        Id: row.TopicId,
                        Title: row.TopicTitle,
                        Path: row.Path,
                        Create_at: row.Create_at,
                        UserId: row.TopicUserId,
                        Status: row.Status
                    }
                }));
                return resolve(posts);
            });
        });
    }

    /**
     * Get all posts with middleware based on a query.
     *
     * @param {Object} query - The query parameters.
     * @param userId - The ID of the user.
     * @returns {Promise} - A promise that resolves with the posts.
     */
    static getAllPostWithMiddleware(query, userId) {
        return new Promise(async (resolve, reject) => {
            let sql = `
            SELECT  posts.Id  AS PostId,
                    posts.Title,
                    posts.Content,
                    posts.Create_post,
                    posts.Id_topics,
                    posts.Id_User,
                    posts.Id_PostAnswer,
                    t.Id      AS TopicId,
                    t.Title   AS TopicTitle,
                    t.Path,
                    t.Create_at,
                    t.Id_User AS TopicUserId,
                    s.Label   AS Status,
                    SUM(CASE WHEN lp.Like = 1 THEN 1 WHEN lp.Like=0 THEN -1 ELSE 0 END) AS PostLikes,
                    (SELECT COUNT(*) FROM message WHERE message.Id_PostAnswer = posts.Id) AS MessageCount ,
                   (
                       tp.Id_Tag = ut.Id_Tag
                       ) AS similarity_score
            FROM posts
                     INNER JOIN topics t ON posts.Id_topics = t.Id
                     INNER JOIN status s ON t.Id_Status = s.Id
                     LEFT JOIN likepost lp ON posts.Id = lp.Id_Post
                 LEFT JOIN friendship f ON (
                     (f.Id_User1 = ? AND f.Id_User2 = posts.Id_User AND f.status = 'friend') OR
                     (f.Id_User2 = ? AND f.Id_User1 = posts.Id_User AND f.status = 'friend')
                 )
                     LEFT JOIN tagstopics tp ON posts.Id_topics = tp.Id_topics
                     LEFT JOIN userstags ut ON tp.Id_Tag = ut.Id_Tag AND ut.Id_User = ?
        `;

            const values = [userId, userId, userId];
            const whereClauses = ["(t.Id_Status = 1 OR (f.status = 'friend' AND t.Id_Status = 2) OR posts.Id_User = ?)"];
            let limitClause = "";
            let offsetClause = "";

            // Include the current user ID for the private topic check
            values.push(userId);

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

            // Add ORDER BY clause to sort by creation date in descending order
            sql += " GROUP BY posts.Id ORDER BY similarity_score DESC";


            // Use the same query without limit and offset to get the total number of results
            this.total = (await this.getTotal(sql, values.slice(0, values.length - (limitClause ? 1 : 0) - (offsetClause ? 1 : 0)))).total;

            sql += limitClause + offsetClause;
            // Execute the query with the values
            connection.query(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve(null);
                }

                const posts = results.map((row) => ({
                    Post: {
                        Id: row.PostId,
                        Title: row.Title,
                        Create_post: row.Create_post,
                        Content: row.Content,
                        Likes: row.PostLikes,
                        MessageCount: row.MessageCount,
                        SimilarityScore: row.similarity_score
                    },
                    Topic: {
                        Id: row.TopicId,
                        Title: row.TopicTitle,
                        Path: row.Path,
                        Create_at: row.Create_at,
                        UserId: row.TopicUserId,
                        Status: row.Status
                    }
                }));
                return resolve(posts);
            });
        });
    }

    /**
     * Like a post.
     *
     * @param {Object} like - The like object.
     * @returns {Promise} - A promise that resolves when the post is liked.
     */
    static likepost(like) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO likepost (Id_User, Id_Post, \`Like\`)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE \`Like\` = VALUES(\`Like\`);`;
            connection.query(sql, [like.Id_User, like.Id_Post, like.Like], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    /**
     * Create a new post.
     *
     * @param {Object} newpost - The new post to create.
     * @returns {Promise} - A promise that resolves with the created post.
     */
    static createpost(newpost) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO posts (Title, Content, Id_topics, Id_User)
                         VALUES (?, ?, ?, ?)`;
            connection.query(sql, [newpost.Title, newpost.Content, newpost.Id_topics, newpost.Id_User], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    /**
     * Update a post.
     *
     * @param {number} id - The ID of the post to update.
     * @param {Object} updatepost - The updated post.
     * @returns {Promise} - A promise that resolves with the updated post.
     */
    static updatePatchpost(id, updatepost) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE posts
                       SET `;
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

    /**
     * Get the like status of posts.
     *
     * @param {number} id - The ID of the post.
     * @returns {Promise} - A promise that resolves with the like status of posts.
     */
    static getLike(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT *
                         FROM likepost
                         WHERE  Id_User = ?`
            connection.query(sql, [id], (err, results) => err ? reject(err) : resolve(results));
        });
    }

    /**
     * Delete a post.
     *
     * @param {number} id - The ID of the post to delete.
     * @returns {Promise} - A promise that resolves when the post is deleted.
     */
    static deletepost(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                         FROM posts
                         WHERE Id = ?`
            connection.query(sql, [id], (err, results) => err ? reject(err) : resolve(results[0]))

        })
    }

    /**
     * Get the total number of posts.
     *
     * @param {string} sql - The SQL query.
     * @param {Array} values - The values for the SQL query.
     * @returns {Promise} - A promise that resolves with the total number of posts.
     */
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

module.exports = postModel;