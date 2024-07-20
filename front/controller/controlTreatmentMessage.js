const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentMessages {

    /**
     * Fetches a specific message by ID.
     * @param {string} id - The ID of the message to fetch.
     * @returns {Promise<Object|undefined>} The message data or undefined if an error occurs.
     */
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
            res.redirect("/coder/err")
        }
    }

    /**
     * Fetches messages that are replies to a specific message.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<Object|undefined>} The messages data or undefined if an error occurs.
     */
    static async GetMessagestoMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }
            const response = await axios.get(`${url}/messagesMiddleware?m.Id_MessageAnswer=${req.params.id}`,{
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
            })

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch (err) {
            return (await axios.get(`${url}/messages?m.Id_MessageAnswer=${req.params.id}`)).data
        }
    }

    /**
     * Updates a specific message by ID.
     * @param {Object} req - The request object.
     * @param {string} req.cookies.Token - The authorization token.
     * @param {Object} req.body - The body of the request containing the update data.
     * @param {string} req.params.id - The ID of the message to update.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} Redirects to the updated message page or error page.
     */
    static async UpdateMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            const dataUpdate = req.body;
            const id = req.params.id;

            await axios.patch(`${url}/message/${id}`, dataUpdate,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                })
            res.redirect('/coder/m/' + id);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Creates a new message.
     * @param {Object} req - The request object.
     * @param {string} req.cookies.Token - The authorization token.
     * @param {Object} req.body - The body of the request containing the message data.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} Redirects to the post page or error page.
     */
    static async CreateMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.redirect(`/coder/login`);
            }

            const {Content, Id_PostAnswer, Id_MessageAnswer} = req.body;


            await axios.post(`${url}/message`, {
                Content,
                Id_PostAnswer,
                Id_MessageAnswer
            }, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect(`/coder/p/${Id_PostAnswer}`);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    static async DeleteMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            const id = req.params.id;

            await axios.delete(`${url}/message/${id}`,
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
}

module.exports = TreatmentMessages;