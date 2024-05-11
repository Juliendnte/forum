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

    static getAllUser(query){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users `

            //S'il y a quelque chose dans la query
            if (!(Object.entries(query).length === 0)){
                const values = [];

                /*
                Un objet marche comme une map en clé valeur
                Name: Julien
                la clé est Name et la valeur Julien
                Ici je met la clé dans la requête sql, la valeur dans une liste qui remplacera les ?
                Et j'ai un index pour mettre un WHERE si il y a une query autre que limit ou offset
                Ma fonction ne marche que si le limit et offset sont a la fin comme en sql
                 */
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