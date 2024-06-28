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
                res.redirect(`/CODER`);
            } else {
                res.status(response.status).send(response.data);
            }
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async GetTopic(name) {
        try {
            const response = await axios.get(`${url}/topic/${name}`)

            if (response.status === 200) {
                return response.data;
            } else {
                errorHandler.setError("Failed to fetch topic data", 401)
                return undefined;
            }
        } catch
            (err) {
            errorHandler.handleRequestError(err);
        }
    }

}

module.exports = TreatmentTopic;