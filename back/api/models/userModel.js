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

    static getAllUser(){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users;`
            connection.query(sql, (err, results)=> {
                err ? reject(err) : resolve(results);
            });
        });
    }

    static createUser(newUser){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (Name, Biography, Email, Password, Id_roles) VALUES ?`;
            connection.query(sql, [newUser.Name, newUser.Biography, newUser.Email, newUser.Password, newUser.Id_roles], (err, results)=> {
                err ? reject(err) : resolve(results[0]);
            });
        });
    }

    static updateUser(id, updateUser){
        return new Promise((resolve, reject) => {

        })
    }

    static deleteUser(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM users WHERE Id=?`
            connection.query(sql,[id], (err)=> {
                if (err) reject(err)
            })
        })
    }
}

module.exports = UserModel;
/*


exports.updateUser= (req,res)=>{
    const Id = req.params.id;
    const updateUser = req.body;
    const userIndex = getAllUser(res).findIndex(user => user.id === Id);
    if (userIndex !== -1) {
        const sql = `UPDATE users SET ${updateUser} WHERE Id=${Id} `;
        connection.query(sql, (err, results)=> {
            if(!err) {
                return res(null, {message: "User updated successfully", status: 200, results});
            } else {
                console.error(`Erreur modif user ${Id} : ${error}`);
                return res(true, {error: err, status: 500});
            }
        });
    } else {
        return res(true, {error:`User ${Id} not found`,status: 404});
    }
};

*/