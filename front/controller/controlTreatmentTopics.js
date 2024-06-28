const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentTopic {
    /**
     * Handle create topic form submission.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async CreateTopicTreatment(req, res) {
        const token = req.cookies.Token;

        if (!token) {
            return res.status(401).send("Unauthorized: No token provided");
        }

        const { Title, Status } = req.body;
        try {
            const response = await axios.post(`${url}/topic`, {
                    Title,
                    Status,
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

            if (response.status === 201) {
                const newTopic = response.data.NewTopic;
                res.redirect(`/CODER/t/${newTopic.Title}`);
            } else {
                res.status(response.status).send(response.data);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async GetTopic(id) {
        try {
            const response = await axios.get(`${url}/topic/${id}`)

            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Unexpected response status when fetching user data: ", response.status);
                res.status(401).send("Failed to fetch topic data");
                return undefined;
            }
        } catch
            (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async GetPost(id) {
        try {
            const response = await axios.get(`${url}/post/${id}`)

            if (response.status === 200) {
                return response.data;
            } else {
                console.error("Unexpected response status when fetching user data: ", response.status);
                res.status(401).send("Failed to fetch topic data");
                return undefined;
            }
        } catch
            (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async GetPosts(req, res) {
        try {
            const response = await axios.get(`${url}/posts/`)

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.handleRequestError("Failed to fetch topic data", 401);
                return undefined;
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

}

module.exports = TreatmentTopic;