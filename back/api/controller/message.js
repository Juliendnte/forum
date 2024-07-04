const message = require("../models/messageModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

class messageController {
    /**
     * Retrieves all messages based on the provided query parameters.
     *
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object.
     */
    static async getMessages(req, res) {
    try {
            const messages = await message.getAllMessage(req.query);
            messages.forEach((message) => message.User.Path = `${baseUrl}/assets/${message.User.Path}`);
            
            if (!messages) {
                return res.status(404).send({
                    message: `messages not found`,
                    status: 404
                });
            }

            return res.status(200).send({
                message: `messages successfully found`,
                status: 200,
                items: messages
            });

        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    /**
     * Retrieves a specific message by its ID and returns it in the response.
     *
     * @param {Object} req - The request object, containing the message ID in the parameters.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing the retrieved message.
     */
    static getMessage(req, res) {
        const messageById = req.message;
        console.log(messageById);
        try {
            messageById.forEach((message) => message.User.Path = `${baseUrl}/assets/${message.User.Path}`);

            return res.status(200).send({
                message: `Article with id ${req.params.id} successfully found`,
                status: 200,
                commentaire: messageById,
            });
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

   /**
     * Creates a new message with the provided content, post ID, and message ID.
     * The user ID is retrieved from the authenticated user's sub claim.
     *
     * @param {Object} req - The request object, containing the message details in the body and the user's sub claim.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing the newly created message.
     */
    static async postMessage(req, res) {
        const {Content, Id_PostAnswer, Id_MessageAnswer} = req.body;
        const Id_User = req.user.Sub;
        if (!Content) {
            return res.status(400).send({
                message: "Tous les champs (Content, Id_PostAnswer, Id_MessageAnswer) sont requis.",
                status: 400
            })
        }

        try {
            const NewMessage = await message.createMessage({Content, Id_PostAnswer, Id_MessageAnswer, Id_User});

            return res.status(201).send({
                message: 'message successfully created',
                status: 201,
                NewMessage
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }
    /**
     * Updates the content of a specific message by its ID.
     *
     * @param {Object} req - The request object, containing the message ID in the parameters and the new content in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async patchMessage(req, res) {
        const id = req.params.id
        const Content = req.body;

        //Check si une clé du body appartient a cette liste
        if (!Content) {
            return res.status(400).send({
                message: "Le champ Content doit être modifié",
                status: 400
            });
        }

        try {
            await message.updatePatchMessage(id, Content);

            return res.status(200).send({
                message: `message with id ${id} successfully updated`,
                status: 200,
            });
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    /**
     * Deletes a specific message by its ID.
     *
     * @param {Object} req - The request object, containing the message ID in the parameters.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async deleteMessage(req, res) {
        const id = req.params.id;
        try {
            await message.deleteMessage(id);

            return res.status(200).send({
                message: `message with id ${id} successfully delete`,
                status: 200,
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }
}

module.exports = messageController;
