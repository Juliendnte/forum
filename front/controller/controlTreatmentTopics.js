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
        const { Title, Path, Status } = req.body;
        try {
            const response = await axios.post(`${url}/topic`, {
                Title,
                Status,
            });
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
        console.log({ Title, Path, Status });
        res.redirect("/CODER");
    }
}

module.exports = TreatmentTopic;