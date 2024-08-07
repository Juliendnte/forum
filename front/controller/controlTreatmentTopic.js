const url = "http://localhost:4000";
const axios = require("axios");
const ErrorHandler = require("./ErrorHandler");
const {Blob} = require('blob-polyfill');


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

        const {Title, Status, Content} = req.body;
        try {
            await axios.post(`${url}/topic`, {
                    Title,
                    Status,
                    Content,
                },
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });
            res.redirect(`/coder/t/${Title}`);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }

    /**
     * Handle getting a topic.
     * @param req The request object
     * @param name Name of the topic
     */
    static async GetTopic(req, name) {
        try {
            const response = await axios.get(`${url}/topicMiddleware/${name}`, {
                headers: {
                    "Authorization": req.cookies.Token,
                    "Content-Type": "application/json"
                }
            })
            return response.data;
        } catch (err) {
            return (await axios.get(`${url}/topic/${name}`)).data
        }
    }

    /**
     * Handle updating a topic.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    static async UpdateTopic(req, res) {
        try {
            const token = req.cookies.Token;

            if (!token) {
                return res.status(400).send("No token found");
            }

            const formData = new FormData();
            let blobFile;

            formData.append('Title', req.body.Title);
            formData.append('Status', req.body.Status);
            formData.append('Content', req.body.Content);
            formData.append('Tags', JSON.stringify(req.body.Tags));

            if (req.file) {
                blobFile = new Blob([req.file.buffer], {type: req.file.mimetype});
                formData.append('TopicImage', blobFile, req.file.originalname);
            }

            const name = req.params.name;

            await axios.patch(`${url}/topic/${name}`, formData,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data"
                    },
                });

            res.redirect('/coder');
        } catch (err) {
            errorHandler.handleRequestError(err)
            res.redirect('/coder/err')
        }
    }

    /**
     * Hanqle getting all tags.
     */
    static async GetTags() {
        try {
            const response = await axios.get(`${url}/tags`);
            return response.data
        } catch (err) {
            errorHandler.handleRequestError(err);
            return undefined;
        }
    }

    /**
     * Handle getting all topics by search
     * @param query The search query
     */
    static async Search(query) {
        try {
            const response = await axios.get(`${url}/search?search=${query}`);
            return response.data;
        } catch (err) {
            errorHandler.setError('Erreur lors de la recherche', 500)
            return undefined;
        }
    }

    /**
     * Handle getting all topics by tags
     * @param tag The tag to search
     */
    static async SearchTags(tag) {
        try {
            const response = await axios.get(`${url}/topics?tags=${tag}`);
            return response.data;
        } catch (err) {
            errorHandler.setError('Erreur lors de la recherche', 500)
            return undefined;
        }
    }

    static async GetTopicOwn(req, idUser) {
        try {
            const response = await axios.get(`${url}/topicsMiddleware?Id_User=${idUser}`, {
                headers: {
                    "Authorization": req.cookies.Token,
                    "Content-Type": "application/json"
                }
            })
            return response.data
        } catch(err) {
            errorHandler.setError('Erreur lors de la recherche', 500)
            return undefined;
        }
    }

    static async DeleteTopic(req, res) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                return res.status(401).send({
                    message: 'No token provided',
                    status: 401
                });
            }

            const name = req.params.name;

            await axios.delete(`${url}/topic/${name}`, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            });

            res.redirect(`/coder`);
        } catch (err) {
            errorHandler.handleRequestError(err);
            res.redirect("/coder/err")
        }
    }
}

module.exports = TreatmentTopic;