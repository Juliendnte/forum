const connection = require("../config/authBDD")

/**
 * Class representing a model for messages.
 */
class messageModel {
    /**
     * Get a message by its ID.
     *
     * @param {number} id - The ID of the message.
     * @returns {Promise} - A promise that resolves with the message.
     */
    static getMessageById(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    m.*,
                    u.Name,
                    u.Path,
                    u.Id AS Id_User,
                    r.Label AS Role,
                    COUNT(m2.Id) AS MessageCount
                FROM
                    message m
                        INNER JOIN
                    users u ON m.Id_User = u.Id
                        INNER JOIN
                    role r ON u.Id_role = r.Id
                        LEFT JOIN
                    message m2 ON m.Id = m2.Id_MessageAnswer
                WHERE
                    m.Id_MessageAnswer = ? OR m.Id = ?
                GROUP BY
                    m.Id, u.Name, u.Path, u.Id, r.Label
                ORDER BY
                    m.Id;
                ;`
            connection.query(sql, [id, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const messages = results.map((message) => ({
                    Id: message.Id,
                    Content: message.Content,
                    Create_message: message.Create_message,
                    Update_message: message.Update_message,
                    Id_PostAnswer: message.Id_PostAnswer,
                    Id_MessageAnswer: message.Id_MessageAnswer,
                    CountMessage: message.MessageCount,
                    User: {
                        Id: message.Id_User,
                        Name: message.Name,
                        Path: message.Path,
                        Role: message.Role,
                    }
                }));
                return resolve(messages);
            });
        });
    }

    /**
     * Get all messages based on a query.
     *
     * @param {Object} query - The query parameters.
     * @returns {Promise} - A promise that resolves with the messages.
     */
    static getAllMessage(query) {
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT m.*, users.Name, users.Path, COUNT(m.Id_MessageAnswer) AS MessageCount

                       FROM message m
                                INNER JOIN users ON m.Id_User = users.Id 
                                `


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


            // Ajouter limit et offset à la requête principale

            sql += ' GROUP BY m.Id ' + limitClause + offsetClause;
            // Exécuter la requête avec les valeurs
            connection.query(sql, values, (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve([]);
                }

                const messages = results.map((message) => ({
                    Id: message.Id,
                    Content: message.Content,
                    Create_message: message.Create_message,
                    Update_message: message.Update_message,
                    Id_PostAnswer: message.Id_PostAnswer,
                    Id_MessageAnswer: message.Id_MessageAnswer,
                    CountMessage: message.MessageCount,
                    User: {
                        Id: message.Id_User,
                        Name: message.Name,
                        Path: message.Path,
                    }
                }));
                return resolve(messages);
            });
        });
    }

    /**
     * Create a new message.
     *
     * @param {Object} newmessage - The new message to create.
     * @returns {Promise} - A promise that resolves with the created message.
     */
    static createMessage(newmessage) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO message (Content, Id_PostAnswer, Id_MessageAnswer, Id_User)
                         VALUES (?, ?, ?, ?)`;
            connection.query(sql, [newmessage.Content, newmessage.Id_PostAnswer, newmessage.Id_MessageAnswer, newmessage.Id_User], (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    /**
     * Update a message.
     *
     * @param {number} id - The ID of the message to update.
     * @param {Object} updatemessage - The updated message.
     * @returns {Promise} - A promise that resolves with the updated message.
     */
    static updatePatchMessage(id, updatemessage) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE message
                       SET Update_message = ?, `;
            const values = [];
            values.push(new Date().toISOString());
            Object.entries(updatemessage).forEach(([key, value], index, entries) => {
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
     * Delete a message.
     *
     * @param {number} id - The ID of the message to delete.
     * @returns {Promise} - A promise that resolves when the message is deleted.
     */
    static deleteMessage(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                         FROM message
                         WHERE Id = ?`
            connection.query(sql, [id], (err, results) => err ? reject(err) : resolve(results[0]))
        })
    }

    /**
     * Get the total number of messages.
     *
     * @param {string} sql - The SQL query.
     * @param {Array} values - The values for the SQL query.
     * @returns {Promise} - A promise that resolves with the total number of messages.
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

module.exports = messageModel;