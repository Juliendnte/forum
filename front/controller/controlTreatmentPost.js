const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentPosts {

    /**
     * Create a new post.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async CreatePost(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.redirect(`/coder/login`);
            }

            const {Title, Content, Id_topics, NameTopic} = req.body;

            await axios.post(`${url}/post`, {
                Title,
                Content,
                Id_topics
            }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect(`/coder/t/${NameTopic}`);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle to get all posts when the user is connected or not.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetPosts(req, res) {
        try {
            const token = req.cookies.Token
            let response = await axios.get(`${url}/postsMiddleware`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            return (await axios.get(`${url}/posts`)).data
        }
    }

    /**
     * Handle getting a specific post by ID.
     * @param id The ID of the post to get.
     */
    static async GetPost(id) {
        try {
            const response = await axios.get(`${url}/postMiddleware/${id}`)
            return response.data;

        } catch (err) {
            return (await axios.get(`${url}/post/${id}`)).data
        }
    }

    /**
     * Handle to update a specific post by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async UpdatePost(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            const dataUpdate = req.body;
            const id = req.params.id;

            await axios.patch(`${url}/post/${id}`, dataUpdate,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                })
            res.redirect('/coder/p/' + id);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Getting all messages for a specific post.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async GetMessagesPost(req, res) {
        try {
            const response = await axios.get(`${url}/messages?m.Id_PostAnswer=${req.params.id}`)
            return response.data;
        } catch (err) {
            errorHandler.setError("Failed to fetch topic data", 401)
            return undefined;
        }
    }

    /**
     * Handle to like a post
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async LikePost(req, res) {
        try {
            const Id_Post = req.params.id
            if (!Id_Post) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/like`, {Id_Post}, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                res.redirect(`back`);
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle to unlike a post
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async UnLikePost(req, res) {
        try {
            const Id_Post = req.params.id
            if (!Id_Post) {
                return undefined;
            }

            const token = req.cookies.Token;
            if (!token) {
                return undefined;
            }

            const response = await axios.post(`${url}/unlike`, {Id_Post}, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                res.redirect(`back`);
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle to delete a post
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async DeletePost(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(401).send({
                    message: 'No token provided',
                    status: 401
                });
            }

            const id = req.params.id;

            await axios.delete(`${url}/post/${id}`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect(`back`);
        } catch (err) {
            console.log(err)
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

}

module
    .exports = TreatmentPosts;