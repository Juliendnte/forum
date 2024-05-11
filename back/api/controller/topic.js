const topic = require("../models/topicModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

exports.getTopics = async (req, res) =>{
    try {
        const topics = await topic.getAllTopic(req.query);

        if (!topics){
            return res.status(404).json({
                message: `Topics not found`,
                status:404
            });
        }else {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 6;
            const href = baseUrl+req.url

            return res.status(200).json({
                message: `Topics successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next:`${href}?limit=${limit}&offset=${offset + limit}` ,
                    previous: `${href}?limit=${limit}&offset=${Math.max(0, offset - limit)}`,
                    total: Object.entries(topics).length,
                    items: topics
                }
            });
        }
    }catch (err){
        res.status(500).json({
            message: err ,
            status:500
        });
    }
}

exports.getTopic = async (req , res) =>{
    //const link = process.env.BASE_URL;
    const topicById = req.article;
    //articleById.Photo = `${link}/asset/${articleById.Photo}`;

    return res.status(200).json({
        message: `Topic with id ${req.params.id} successfully found`,
        status: 200,
        topic: topicById
    })
};

exports.postTopic = async (req,res)=>{
    const {Title, Description, Id_Status, Id_User} = req.body;
    
    if (!Title || !Description || !Id_Status || !Id_User){
        return res.status(400).json({
            message: "Tous les champs (Title, Description, Id_Status, Id_User) sont requis.",
            status: 400
        })
    }
    
    try{
        const NewTopic = await topic.createTopic({
            Title,
            Description,
            Id_Status,
            Id_User
        });

        return  res.status(201).json({
            message: `Topic successfully created`,
            status: 201,
            NewTopic
        });
    }catch (err){
        res.status(500).json({
            message: err,
            status: 500
        });
    }
}

exports.putTopic = async (req,res)=>{
    const id = req.params.id;
    const {Title, Description, Id_Status, Id_User} = req.body;

    if (!Title || !Description || !Id_Status || !Id_User){
        return res.status(400).json({
            message: "Tous les champs (Title, Description, Id_Status, Id_User) sont requis.",
            status: 400
        })
    }

    try {
        await topic.updatePutTopic(id, {
            Title,
            Description,
            Id_Status,
            Id_User
        });

        return res.status(200).json({
            messge: `Topic with id ${id} successfully updated`,
            status: 200
        })
    }catch (err) {
        return res.status(500).json({
            message: err,
            status: 500
        })
    }
}

exports.patchTopic = async (req,res)=>{
    const id = req.params.id
    const body = req.body;

    //Check si une clé du body appartient a cette liste
    if (!body || !Object.keys(body).some(key => ["Title", "Description", "Id_Status", "Id_User"].includes(key))) {
        return res.status(400).json({
            message: "Au moins un des champs (Title, Description, Id_Status, Id_User) doit être modifié",
            status: 400
        });
    }

    try{
        await topic.updatePatchTopic(id, body);

        return res.status(200).json({
            message: `Topic with id ${id} successfully updated`,
            status: 200,
        });
    }catch (err){
        res.status(500).json({
            message: err,
            status:500
        });
    }
}

exports.deleteTopic = async (req,res)=>{
    const id = req.params.id;
    try {
        await topic.deleteTopic(id);

        return res.status(200).json({
            message: `Topic with id ${id} successfully delete`,
            status: 200
        })
    }catch (err){
        res.status(500).json({
            message: err ,
            status:500
        });
    }
}

