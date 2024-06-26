const post = require("../models/postModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const pagination = 5;

/**
 * Function that build a query without limit and offset
 * @param query The query
 * @returns {string|string} The query without limit and offset
 */
function buildQueryWithoutLimitOffset(query) {
    const filteredQuery = Object.entries(query).filter(([key]) => key.toLowerCase() !== "limit" && key.toLowerCase() !== "offset")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
    return filteredQuery ? `?${filteredQuery}` : "";
}

class PostController {
    static async getPosts(req, res) {
        try {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || pagination;
            const href = `${baseUrl}/topics${buildQueryWithoutLimitOffset(req.query)}`;

            const posts = await post.getAllpost(req.query);

            if (posts.length === 0) {
                return res.status(404).send({
                    message: `posts not found`,
                    status: 404
                });
            }

            const total = posts.length;

            return res.status(200).send({
                message: `Posts successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next: total - limit <= offset ? null : `${href}&limit=${limit}&offset=${offset + limit}`,
                    previous: offset ? `${href}&limit=${limit}&offset=${offset - limit}` : null,
                    total,
                    last_page: Math.ceil(total / limit),
                    current_page: Math.ceil(offset / limit) + 1,
                    items: posts,
                }
            });

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
