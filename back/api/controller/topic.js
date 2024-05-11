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
            message:err.sqlMessage,
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

exports.postTopic = (req,res)=>{

}

exports.putTopic = (req,res)=>{

}

exports.patchTopic = (req,res)=>{

}

exports.deleteTopic = async (req,res)=>{
    const id = req.params.id;
    try {
        await topic.deleteTopic(id);

        return res.status(200).json({
            message: `User with id ${id} successfully delete`,
            status: 200
        })
    }catch (err){
        res.status(500).json({
            message:err.sqlMessage,
            status:500
        });
    }
}

