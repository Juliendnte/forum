const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");

const errorHandler = new ErrorHandler();

class TreatmentMessages {

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
            res.redirect("/CODER/err")
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
            res.redirect("/CODER/err")
        }
    }

    static async UpdateMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(400).send("No token found");
            }

            const dataUpdate = req.body;

            console.log(dataUpdate)

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
            res.redirect("/CODER/err")
        }
    }

    static async CreateMessage(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.redirect(`/CODER/login`);
            }

            const {Content, Id_PostAnswer, Id_MessageAnswer} = req.body;

            console.log("Data received:", Content, Id_PostAnswer, Id_MessageAnswer);

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

            res.redirect(`/CODER/p/${Id_PostAnswer}`);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/CODER/err")
        }

    }

}

module.exports = TreatmentMessages;