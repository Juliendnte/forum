const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentPosts {

    static async CreateMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.redirect(`/CODER/login`);
            }

            const { Title, Content, Id_topics, NameTopic } = req.body;

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

    static async GetMessages(req, res) {
        try {
            const token = req.cookies.Token;
            let response = await axios.get(`${url}/messages`, {
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

    static async GetMessage(id) {
        try {
            const response = await axios.get(`${url}/message/${id}`)

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

    static async GetMessagestoMessage(req, res) {
        try {
            const response = await axios.get(`${url}/messages?m.Id_MessageAnswer=${req.params.id}`)

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

}

module
    .exports = TreatmentPosts;