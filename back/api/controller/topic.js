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
    const id = req.params.id;
    const link = process.env.BASE_URL;
    try {
        const topicById = await topic.getTopicById(id);
        topicById.Photo = `${link}/images/${topicById.Photo}`;
        if (!topicById){
            return res.status(404).json({
                message: `User with id ${id} not found`
            });
        }else{
            return res.status(200).json({
                message: `User with id ${id} successfully found`,
                user: topicById
            })
        }
    }catch (err){
        res.status(500).json({
            message:err,
            status:500
        });
    }
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
        })
    }catch (err){
        res.status(500).json({
            message:err,
            status:500
        });
    }
}

