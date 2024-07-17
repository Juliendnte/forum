const post = require("../models/postModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const pagination = 10;

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

            posts.forEach(post => post.Topic.Path = `${baseUrl}/assets/${post.Topic.Path}`);
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

    static async getPostsMiddleware(req, res){
        try {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || pagination;
            const href = `${baseUrl}/topics${buildQueryWithoutLimitOffset(req.query)}`;

            const posts = await post.getAllPostWithMiddleware(req.query, req.user.Sub);

            if (posts.length === 0) {
                return res.status(404).send({
                    message: `posts not found`,
                    status: 404
                });
            }

            posts.forEach(post => post.Topic.Path = `${baseUrl}/assets/${post.Topic.Path}`);
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
            postById.User.Path = `${baseUrl}/assets/${postById.User.Path}`;

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

    static async getPostMiddleware(req, res) {
        const postById = await post.getpostByIdWithMiddleware(req.params.id, req.user.Sub);
        try {
            postById.User.Path = `${baseUrl}/assets/${postById.User.Path}`;

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

    static async getLiked(req, res){
        const id = req.user.Sub
        try {
            const liked = await post.getLike(id);
            if (liked.length === 0) {
                return res.status(404).send({
                    message: `no posts liked`,
                    status: 404
                });
            }
            res.status(200).send({
                message: 'posts liked found',
                status: 200,
                liked
            })
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async Like(req, res) {
        const Id_Post =  parseInt(req.body.Id_Post);
        const Id_User = req.user.Sub;
        if (!Id_Post) {
            return res.status(400).send({
                message: "Le champ Id_Post est requis.",
                status: 400
            })
        }

        try {
            let like = await post.getLike(Id_User);
            like = like.find(like => parseInt(like.Id_Post) === Id_Post);
            await post.likepost({Id_Post, Id_User, Like: (!like || !like.Like) ? 1 : null});

            return res.status(201).send({
                message: 'Liked successfully',
                status: 201
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    /**
     * Unlikes a post.
     *
     * @async
     * @param {Object} req - The request object.
     * @param {Object} req.body - The body of the request.
     * @param {number} req.body.Id_Post - The ID of the post to unlike.
     * @param {Object} req.user - The user object.
     * @param {number} req.user.Sub - The ID of the user unliking the post.
     * @param {Object} res - The response object.
     * @returns {Object} The response object.
     * @throws Will throw an error if the request fails.
     */
    static async UnLike(req, res) {
        const Id_Post =  parseInt(req.body.Id_Post);
        const Id_User = req.user.Sub;
        if (!Id_Post) {
            return res.status(400).send({
                message: "Le champ Id_Post est requis.",
                status: 400
            })
        }

        try {
            let like = await post.getLike(Id_User);
            like = like.find(like => parseInt(like.Id_Post) === Id_Post);
            await post.likepost({Id_Post, Id_User, Like: (!like || like.Like !==0 ) ? 0 : null});

            return res.status(201).send({
                message: 'Unliked successfully',
                status: 200
            })
        } catch (err) {
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }

    static async postPost(req, res) {
        const {Title, Content, Id_topics} = req.body;
        const Id_User = req.user.Sub;
        if (!Title || !Content || !Id_topics) {
            return res.status(400).send({
                message: "Tous les champs (Title, Content, Id_topics) sont requis.",
                status: 400
            })
        }

        try {
            const Newpost = await post.createpost({
                Content,
                Id_topics,
                Id_User,
                Title
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
        const {Content, Title} = req.body;

        if (!Content || !Title) {
            return res.status(400).send({
                message: "Les champs Content, Title peuvent être modifié",
                status: 400
            });
        }

        try {
            await post.updatePatchpost(id, {Content, Title});

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
