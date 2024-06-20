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
            const sql = `INSERT INTO users (Name, Email, Password, Salt, Create_at)VALUES (?,?,?,?, DEFAULT)`;
            console.log(sql)
            console.log(user)
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
            const sql = `
                            SELECT 
                                u.Name, 
                                u.Biography, 
                                u.Email, 
                                u.Path AS Img_Profil, 
                                u.Create_at, 
                                r.Label As Role,
                                t.Label AS Tags
                            FROM users u
                            LEFT JOIN role r ON u.Id_role = r.Id
                            LEFT JOIN userstags ON u.Id = userstags.Id_User
                            LEFT JOIN tags t ON userstags.Id_Tag = t.Id
                            WHERE u.Id = ?`;
            connection.query(sql, [id],(err,results)=> err ? reject(err) : resolve(results[0]));
        })
    }

    static setPassword(password, id){
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE users SET Password = ?, Salt = ? WHERE Id = ?;`;
            connection.query(sql, [password.hashedPassword, password.salt ,id],(err,results)=> err ? reject(err) : resolve(results[0]));
        })
    }

    static updatePatchUser(id, updateUser){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE users SET `;
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

    static getFriends(id){
        return new Promise((resolve, reject)=>{
            const sql = `
                            SELECT 
                                u2.Id,
                                u2.Name,
                                u2.Path
                            FROM friendship f 
                            LEFT JOIN users u1 ON f.Id_User1 = u1.Id
                            LEFT JOIN users u2 ON f.Id_User2 = u2.Id
                            WHERE u1.Id = ? AND f.status = 'friend'`;
            connection.query(sql, id , (err, results)=> err ? reject(err) : resolve(results));
        })
    }
}

module.exports = logModel;