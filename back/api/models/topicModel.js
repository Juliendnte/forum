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

    static getAllTopic(){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM topic;`
            connection.query(sql, (err, results)=> {
                err ? reject(err) : resolve(results);
            });
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