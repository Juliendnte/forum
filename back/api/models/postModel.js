const connection = require("../config/authBDD")

class postModel{
    static getpostById(id){
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    p.*,
                    u.Name,
                    r.Label AS Role,
                    COUNT(lp.Id_User) AS Likes,
                    SUM(lp.Dislike) AS Dislikes,
                    COUNT(m.Id) AS MessageCount
                FROM posts p
                LEFT JOIN users u ON p.Id_User = u.Id
                LEFT JOIN role r ON u.Id_role = r.Id
                LEFT JOIN likepost lp ON lp.Id_Post = p.Id
                LEFT JOIN message m ON p.Id = m.Id_PostAnswer
                WHERE p.Id = ?
                GROUP BY
                    p.Id,
                    u.Name,
                    r.Label`
            connection.query(sql,[id], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static getAllpost(query){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM posts `

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

    static createpost(newpost){
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO posts (Content, Id_PostAnswer, Id_topics, Id_User) VALUES (?, ?, ?, ?)`;
            connection.query(sql, [newpost.Content, newpost.Id_PostAnswer, newpost.Id_topics, newpost.Id_User], (err, results)=> err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePutpost(id, updatepost){
        return new Promise((resolve, reject) => {
            const sql = `UPDATE posts SET Content=?, Id_PostAnswer=?, Id_topics=?, Id_User=? WHERE id=?`;
            const values = [updatepost.Content, updatepost.Id_PostAnswer, updatepost.Id_topics, updatepost.Id_User, id];

            connection.query(sql, values, (err, results) => err ? reject(err) : resolve(results[0]));
        });
    }

    static updatePatchpost(id, updatepost){
        return new Promise((resolve, reject) => {
            let sql = `UPDATE posts SET `;
            const values = [];

            /*
            entries est l'objet en liste de liste
            [
                ["Name","Julien],
                ["Project","Boutique"]
            ]
             */
            Object.entries(updatepost).forEach(([key, value], index, entries) => {
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

    static deletepost(id){
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM posts WHERE Id=?`
            connection.query(sql,[id], (err,results)=> err ? reject(err) : resolve(results[0]))

        })
    }
}

module.exports = postModel;