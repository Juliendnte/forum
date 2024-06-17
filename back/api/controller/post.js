const post = require("../models/postModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

exports.getPosts = async (req, res) =>{
    try {
        const posts = await post.getAllpost(req.query);

        if (!posts){
            return res.status(404).json({
                message: `posts not found`,
                status:404
            });
        }else {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 6;
            const href = baseUrl+"/posts"

            return res.status(200).json({
                message: `posts successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next:`${href}?limit=${limit}&offset=${offset + limit}` ,
                    previous: `${href}?limit=${limit}&offset=${Math.max(0, offset - limit)}`,
                    total: Object.entries(posts).length,
                    items: posts
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

exports.getPost = async (req , res) =>{
    //const link = process.env.BASE_URL;
    const postById = req.article;
    //articleById.Photo = `${link}/asset/${articleById.Photo}`;

    return res.status(200).json({
        message: `post with id ${req.params.id} successfully found`,
        status: 200,
        post: postById
    })
};

exports.postPost = async (req,res)=>{
    const {Name, Biography, Email, Password, Id_roles} = req.body;

    if (!Name || !Biography || !Email || !Password || !Id_roles){
        return res.status(400).json({
            message: "Tous les champs (Name, Biography, Email, Password, Id_roles) sont requis.",
            status: 400
        })
    }

    try {
        const Newpost = await post.createpost({
            Name,
            Biography,
            Email,
            Password,
            Id_roles
        });
        
        return res.status(201).json({
            message: 'post successfully created',
            status: 201,
            Newpost
        })
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        })
    }
}

exports.putPost = async (req,res)=>{
    const id = req.params.id;
    const {Name, Biography, Email, Password, Id_roles} = req.body;

    if (!Name || !Biography || !Email || !Password || !Id_roles){
        return res.status(400).json({
            message: "Tous les champs (Name, Biography, Email, Password, Id_roles) sont requis.",
            status: 400
        })
    }

    try {
        await post.updatePutpost({
            Name,
            Biography,
            Email,
            Password,
            Id_roles
        });

        return res.status(200).json({
            message: `post with id ${id} successfully updated`,
            status: 200,
        })
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        })
    }
}

exports.patchPost = async (req,res)=>{
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
        await post.updatePatchpost(id, body);

        return res.status(200).json({
            message: `post with id ${id} successfully updated`,
            status: 200,
        });
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        });
    }
}

exports.deletePost = async (req,res)=>{
    const id = req.params.id;
    try {
        await post.deletepost(id);
        return res.status(200).json({
            message: `post with id ${id} successfully delete`,
            status: 200,
        })
    }catch (err){
        res.status(500).json({
            message:err,
            status: 500
        });
    }
}

