const connection = require("../config/authBDD")

class topicModel{
    static getTopicById(id){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM topic WHERE Id=?`
            connection.query(sql,[id], (err, results)=>{
                err ? reject(err) : resolve(results[0]);
            });
        });
    }

    static getAllTopic(query){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM topic `

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

    static createTopic(newTopic){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO topic (Title, Description, Id_Status, Id_User) VALUES ?`;
            connection.query(sql, [newTopic.Title, newTopic.Description, newTopic.Id_Status, newTopic.Id_User], (err, results)=> {
                err ? reject(err) : resolve(results[0]);
            });
        });
    }

    static updateTopic(id, updateTopic){
        return new Promise((resolve, reject) => {

        })
    }

    static deleteTopic(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM topic WHERE Id=?`
            connection.query(sql,[id], (err)=> {
                if (err) reject(err)
            })
        })
    }
}

module.exports = topicModel;