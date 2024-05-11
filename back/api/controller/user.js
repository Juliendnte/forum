const user = require("../models/userModel");
require('dotenv').config();

exports.getUsers = async (req, res) =>{
    try {
        const users = await user.getAllUser();
        console.log(users)
        if (!users){
            return res.status(404).json({
                message: `Users not found`
            });
        }else{
            return res.status(200).json({
                message: `Users successfully found`,
                users
            })
        }
    }catch (err){
        res.status(500).json({
            message:err,
        });
    }
}
/*
Pourquoi ne pas faire une seul fonction dynamique ou je met juste en paramètre la requête sql??
 */
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

