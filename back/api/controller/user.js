const user = require("../models/userModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

exports.getUsers = async (req, res) =>{
    try {
        const users = await user.getAllUser(req.query);

        if (!users){
            return res.status(404).json({
                message: `Users not found`,
                status:404
            });
        }else {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 6;
            const href = baseUrl+"/users"

            return res.status(200).json({
                message: `Users successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next:`${href}?limit=${limit}&offset=${offset + limit}` ,
                    previous: `${href}?limit=${limit}&offset=${Math.max(0, offset - limit)}`,
                    total: Object.entries(users).length,
                    items: users
                }
            });
        }
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        });
    }
}

exports.getUser = async (req , res) =>{
    //const link = process.env.BASE_URL;
    const userById = req.article;
    //articleById.Photo = `${link}/asset/${articleById.Photo}`;

    return res.status(200).json({
        message: `User with id ${req.params.id} successfully found`,
        status: 200,
        User: userById
    })
};

exports.postUser = async (req,res)=>{
    const {Name, Biography, Email, Password, Id_roles} = req.body;

    if (!Name || !Biography || !Email || !Password || !Id_roles){
        return res.status(400).json({
            message: "Tous les champs (Name, Biography, Email, Password, Id_roles) sont requis.",
            status: 400
        })
    }

    try {
        const NewUser = await user.createUser({
            Name,
            Biography,
            Email,
            Password,
            Id_roles
        });
        
        return res.status(201).json({
            message: 'User successfully created',
            status: 201,
            NewUser
        })
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        })
    }
}

exports.putUser = async (req,res)=>{
    const id = req.params.id;
    const {Name, Biography, Email, Password, Id_roles} = req.body;

    if (!Name || !Biography || !Email || !Password || !Id_roles){
        return res.status(400).json({
            message: "Tous les champs (Name, Biography, Email, Password, Id_roles) sont requis.",
            status: 400
        })
    }

    try {
        await user.updatePutUser({
            Name,
            Biography,
            Email,
            Password,
            Id_roles
        });

        return res.status(200).json({
            message: `User with id ${id} successfully updated`,
            status: 200,
        })
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        })
    }
}

exports.patchUser = async (req,res)=>{
    const id = req.params.id
    const body = req.body;

    //Check si une clé du body appartient a cette liste
    if (!body || !Object.keys(body).some(key => ["Name", "Biography", "Email", "Password", "Id_roles"].includes(key))) {
        return res.status(400).json({
            message: "Au moins un des champs (Name, Biography, Email, Password, Id_roles) doit être modifié",
            status: 400
        });
    }

    try{
        await user.updatePatchUser(id, body);

        return res.status(200).json({
            message: `User with id ${id} successfully updated`,
            status: 200,
        });
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        });
    }
}


exports.deleteUser = async (req,res)=>{
    const id = req.params.id;
    try {
        await user.deleteUser(id);
        return res.status(200).json({
            message: `User with id ${id} successfully delete`,
            status: 200,
        })
    }catch (err){
        res.status(500).json({
            message:err,
            status: 500
        });
    }
}

