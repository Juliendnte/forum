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
                SELECT m.*,
                       u.Name,
                       u.Path,
                       U.Id    AS Id_User,
                       r.Label AS Role,
                        COUNT(m.Id_MessageAnswer) AS MessageCount

                FROM message m
                         LEFT JOIN users u ON m.Id_User = u.Id
                         LEFT JOIN role r ON u.Id_role = r.Id
                WHERE m.Id = ?`
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                const message = {
                    Id: results[0].Id,
                    Content: results[0].Content,
                    Create_message: results[0].Create_message,
                    Update_message: results[0].Update_message,
                    Id_PostAnswer: results[0].Id_PostAnswer,
                    Id_MessageAnswer: results[0].Id_MessageAnswer,
                    CountMessage: results[0].MessageCount,
                    Role: results[0].Role,
                    User: {
                        Id: results[0].Id_User,
                        Name: results[0].Name,
                        Path: results[0].Path,
                    }
                }
                return resolve(message);
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
                                LEFT JOIN users ON m.Id_User = users.Id `


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