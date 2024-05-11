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
            const href = baseUrl+req.url

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
            message:err.sqlMessage,
            status:500
        });
    }
}

exports.getUser = async (req , res) =>{
    const id = req.params.id;
    const link = process.env.BASE_URL;
    try {
        const userById = await user.getUserById(id);
        userById.Photo = `${link}/images/${userById.Photo}`;
        if (!userById){
            return res.status(404).json({
                message: `User with id ${id} not found`
            });
        }else{
            return res.status(200).json({
                message: `User with id ${id} successfully found`,
                user: userById
            })
        }
    }catch (err){
        res.status(500).json({
            message:err,
        });
    }
};

exports.postUser = (req,res)=>{
    try{

    }catch (err){
        res.status(500).json({
            message:err
        })
    }
}

exports.putUser = (req,res)=>{

}

exports.patchUser = (req,res)=>{

}


exports.deleteUser = async (req,res)=>{
    const id = req.params.id;
    try {
        await user.deleteUser(id);
        return res.status(200).json({
            message: `User with id ${id} successfully delete`,
        })
    }catch (err){
        res.status(500).json({
            message:err,
        });
    }
}

