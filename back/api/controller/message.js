const message = require("../models/messageModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

class messageController{
    static async getMessages(req, res) {
        try {
            const messages = await message.getAllMessage(req.query);

            if (!messages){
                return res.status(404).send({
                    message: `messages not found`,
                    status:404
                });
            }else {
                return res.status(200).send({
                    message: `messages successfully found`,
                    status: 200,
                    items: messages
                });
            }
        }catch (err){
            res.status(500).send({
                message: err,
                status:500
            });
        }
    }

    static getMessage(req, res) {
        const messageById = req.message;
        try{
            messageById.Path = `${baseUrl}/assets/${messageById.Path}`;

            return res.status(200).send({
                message: `Article with id ${req.params.id} successfully found`,
                status: 200,
                commentaire: messageById,
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async postMessage(req,res){
        const {Content, Id_PostAnswer, Id_MessageAnswer} = req.body;
        const Id_User = req.user.Sub;
        if (!Content || !Id_PostAnswer || !Id_MessageAnswer){
            return res.status(400).send({
                message: "Tous les champs (Content, Id_PostAnswer, Id_MessageAnswer) sont requis.",
                status: 400
            })
        }

        try {
            const NewMessage = await message.createMessage({ Content, Id_PostAnswer, Id_MessageAnswer, Id_User});

            return res.status(201).send({
                message: 'message successfully created',
                status: 201,
                NewMessage
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status:500
            })
        }
    }

    static async patchMessage(req,res){
        const id = req.params.id
        const {Content} = req.body;

        //Check si une clé du body appartient a cette liste
        if (!Content) {
            return res.status(400).send({
                message: "Le champ Content doit être modifié",
                status: 400
            });
        }

        try{
            await message.updatePatchMessage(id, Content);

            return res.status(200).send({
                message: `message with id ${id} successfully updated`,
                status: 200,
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status:500
            });
        }
    }

    static async deleteMessage(req, res){
        const id = req.params.id;
        try {
            await message.deleteMessage(id);
            return res.status(200).send({
                message: `message with id ${id} successfully delete`,
                status: 200,
            })
        }catch (err){
            res.status(500).send({
                message:err,
                status: 500
            });
        }
    }
}

module.exports = messageController;
