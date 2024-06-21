const connection = require("../config/authBDD")

class topicModel{
    total = 0;

    static getTopicById(id){
        return new Promise((resolve, reject) => {
            const sql = `
                            SELECT 
                                t.Id,
                                t.Title,
                                t.Path,
                                t.Create_at,
                                t.Id_User,
                                s.Label AS Status
                            FROM topics t
                            LEFT JOIN status s ON t.Id_Status = s.Id
                            WHERE t.Id=?`
            connection.query(sql,[id], (err, results)=>{
                err ? reject(err) : resolve(results[0]);
            });
        });
    }

    static getAllTopic(query){
        return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM topics `

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

    static getTags(){
        return new Promise((resolve, reject) => {
            const sql = `SELECT Label, Path FROM tags`;
            connection.query(sql, (err, results)=> err ? reject(err) : resolve(results));
        })
    }

    static createTopic(newTopic){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO topics (Title, Id_Status, Id_User) VALUES (?, 1, ?)`;
            connection.query(sql, [newTopic.Title, newTopic.Id_User], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchTopic(id, updateTopic){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE topics SET `;
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

    static deleteTopic(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM topics WHERE Id=?`
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

module.exports = topicModel;