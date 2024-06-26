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
        const {Title, Path, Status} = req.body;
        try {
            const response = await axios.post(`${url}/topic`, {
                Title,
                Status,
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        res.redirect("/CODER");
    }

    static async GetTopic(id) {
        try {
            const response = await axios.get(`${url}/topic/${id}`)

            if (response.status === 200) {
                console.log(response.data)
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
}
    module.exports = TreatmentTopic;