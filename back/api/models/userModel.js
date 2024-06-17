const connection = require("../config/authBDD")

class logModel{

    static login (email = null,username = null){
        return new Promise((resolve,reject)=>{
            let sql = ``
            if(email) {
                sql = `SELECT * FROM users WHERE Email = ?`;//Car email unique
                connection.query(sql,email, (err, results)=> err ? reject(err) : resolve(results[0]));
            }else {
                sql = `SELECT * FROM users WHERE Name = ?`;
                connection.query(sql,username, (err, results)=> err ? reject(err) : resolve(results[0]));
            }
        });
    }

    static register(user){
        return new Promise((resolve,reject)=>{
            const sql = `INSERT INTO users (Name, Email, Password, Salt, Create_at)VALUES(?,?,?,?, DEFAULT)`;
            connection.query(sql,[user.username,user.email, user.Password.hashedPassword, user.Password.salt], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM users WHERE Email = ?`;
            connection.query(sql,[email],(err,results)=> err ? reject(err) : resolve(results[0]));
        })
    }

    static getUserById(id){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM users WHERE Id = ?`;
            connection.query(sql, [id],(err,results)=> err ? reject(err) : resolve(results[0]));
        })
    }

    static setPassword(password, id){
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE users SET Pwd = ?, Salt = ? WHERE Id = ?;`;
            connection.query(sql, [password.hashedPassword, password.salt ,id],(err,results)=> err ? reject(err) : resolve(results[0]));
        })
    }
}

module.exports = logModel;