const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentPosts {

    static async CreatePost(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.redirect(`/CODER/login`);
            }

            const {Title, Content, Id_topics, NameTopic} = req.body;

            console.log("Data received:", Title, Content, Id_topics, NameTopic);

            const response = await axios.post(`${url}/post`, {
                Title,
                Content,
                Id_topics
            }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect(`/CODER/t/${NameTopic}`);
        } catch (err) {
            console.error("Error creating post:", err);
            if (err.response) {
                console.error("Server responded with:", err.response.data);
            }
            res.status(500).send("Internal server error");
        }
    }

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

    static async GetPost(id) {
        try {
            const response = await axios.get(`${url}/post/${id}`)

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async UpdatePost(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            const dataUpdate = req.body;

            console.log(dataUpdate)

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
            console.log(err.response.data)
            errorHandler.handleRequestError(err)
        }
    }

    static async GetMessagesPost(req, res) {
        try {
            const response = await axios.get(`${url}/messages?m.Id_PostAnswer=${req.params.id}`)

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

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
        }
    }

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
        }
    }

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
                    "Authorization": `Bearer ${token}`, // Assurez-vous d'utiliser le format correct pour le token
                    "Content-Type": "application/json"
                }
            });

            return res.status(200).send({
                message: `Post with id ${id} successfully deleted`,
                status: 200
            });
        } catch (err) {
            console.error(err);
            errorHandler.setError('An error occurred while deleting the post', 500);
            return res.status(500).send({
                message: 'An error occurred while deleting the post',
                status: 500
            });
        }
    }

}

module
    .exports = TreatmentPosts;