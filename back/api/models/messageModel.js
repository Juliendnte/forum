const connection = require("../config/authBDD")

class messageModel{
    static getMessageById(id){
        return new Promise((resolve, reject) => {
            const sql = `
                            SELECT 
                                m.* ,
                                u.Name,
                                u.Path,
                                U.Id AS Id_User,
                                r.Label AS Role
                            FROM message m
                            LEFT JOIN users u ON m.Id_User = u.Id
                            LEFT JOIN role r ON u.Id_role = r.Id
                            WHERE m.Id=?`
            connection.query(sql,[id], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static getAllMessage(query){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM message `

            //S'il y a quelque chose dans la query
            if (!(Object.entries(query).length === 0)){
                const values = [];

                Object.entries(query).forEach(([key, value], index) => {
                    if (key.toLowerCase() === "limit" || key.toLowerCase() === "offset"){
                        sql += `${key} ? `;
                        values.push(parseInt(value));
                    }else{
                        sql += index ===0 ? "WHERE ": "AND "
                        sql += `${key}=? `;
                        values.push(value);
                    }
                });

                connection.query(sql,values, (err, results)=> err ? reject(err) : resolve(results));
            }else{
                connection.query(sql, (err, results)=> err ? reject(err) : resolve(results));
            }
        });
    }

    static createMessage(newmessage){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO message (Content, Id_PostAnswer, Id_MessageAnswer, Id_User) VALUES (?, ?, ?, ?)`;
            connection.query(sql, [newmessage.Content, newmessage.Id_PostAnswer, newmessage.Id_MessageAnswer, newmessage.Id_User], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchMessage(id, updatemessage){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE message SET Update_message = ?, `;
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

    static deleteMessage(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM message WHERE Id=?`
            connection.query(sql,[id], (err,results)=> err ? reject(err) : resolve(results[0]))
        })
    }
}

module.exports = messageModel;