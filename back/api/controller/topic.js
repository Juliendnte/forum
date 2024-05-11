const topic = require("../models/topicModel");
require('dotenv').config();

exports.getTopics = async (req, res) =>{
    try {
        const topics = await topic.getAllTopic();
        if (!topics){
            return res.status(404).json({
                message: `Users not found`
            });
        }else{
            return res.status(200).json({
                message: `User with id ${id} successfully found`,
                topics
            })
        }
    }catch (err){
        res.status(500).json({
            message:err,
            status:500
        });
    }
}
/*
Pourquoi ne pas faire une seul fonction dynamique ou je met juste en paramètre la requête sql??
 */
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

