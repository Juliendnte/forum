const post = require("../models/postModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

class PostController {
    static async getPosts(req, res) {
        try {
            const posts = await post.getAllpost(req.query);

            if (!posts) {
                return res.status(404).send({
                    message: `posts not found`,
                    status: 404
                });
            } else {
                return res.status(200).send({
                    message: `posts successfully found`,
                    status: 200,
                    items: posts
                });
            }
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static getPost(req, res) {
        const postById = req.post;
        try {
            postById.Path = `${baseUrl}/assets/${postById.Path}`;

            return res.status(200).send({
                message: `Article with id ${req.params.id} successfully found`,
                status: 200,
                post: postById,
            });
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async postPost(req, res) {
        const {Content, Id_topics, Id_PostAnswer} = req.body;
        const Id_User = req.user.Sub;
        if (!Content || !Id_topics || !Id_PostAnswer) {
            return res.status(400).send({
                message: "Tous les champs (Name, Biography, Email, Password, Id_roles) sont requis.",
                status: 400
            })
        }

        try {
            const Newpost = await post.createpost({
                Content,
                Id_topics,
                Id_PostAnswer,
                Id_User
            });

            return res.status(201).send({
                message: 'post successfully created',
                status: 201,
                Newpost
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async patchPost(req, res) {
        const id = req.params.id
        const {Content} = req.body;

        //Check si une clé du body appartient a cette liste
        if (!Content) {
            return res.status(400).send({
                message: "Le champ Content doit être modifié",
                status: 400
            });
        }

        try {
            await post.updatePatchpost(id, Content);

            return res.status(200).send({
                message: `post with id ${id} successfully updated`,
                status: 200,
            });
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            await post.deletepost(id);
            return res.status(200).send({
                message: `post with id ${id} successfully delete`,
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

module.exports = PostController;
