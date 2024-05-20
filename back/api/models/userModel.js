const connection = require("../config/authBDD")

class UserModel{
    static getUserById(id){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE Id=?`
            connection.query(sql,[id], (err, results)=>{
                err ? reject(err) : resolve(results[0]);
            });
        });
    }

    static login(email = null,username = null{
        return new Promise((resolve,reject)=>{
            let sql = ``
            if(email) {
                sql = `SELECT *
                       FROM users
                       WHERE Email = ?`;//Car email unique
                connection.query(sql,email, (err, results)=> err ? reject(err) : resolve(results[0]));
            }else {
                sql = `SELECT *
                       FROM users
                       WHERE Name = ?`;
                connection.query(sql,username, (err, results)=> err ? reject(err) : resolve(results[0]));
            }
        });
    }

    static register(user){
        return new Promise((resolve,reject)=>{
            const sql = `INSERT INTO users (Name, Email, Pwd, Salt)VALUES(?,?,?,?)`;
            connection.query(sql,[user.username,user.email, user.hashedPassword, user.salt], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchUser(id, updateUser){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE users SET `;
            const values = [];

            /*
            entries est l'objet en liste de liste
            [
                ["Name","Julien],
                ["Project","Boutique"]
            ]
             */
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

    static deleteUser(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE Id=?`
            connection.query(sql,[id], (err,results)=> err ? reject(err) : resolve(results[0]))
        })
    }
}

module.exports = UserModel;