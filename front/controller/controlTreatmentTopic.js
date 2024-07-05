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
            formData.append('Tags', JSON.stringify(req.body.Tags));

            if (req.file) {
                blobFile = new Blob([req.file.buffer], {type: req.file.mimetype});
                formData.append('TopicImage', blobFile, req.file.originalname);
            }

            const name = req.params.name;
            console.log(name)
            console.log(formData)
            await axios.patch(`${url}/topic/${name}`, formData,
                {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data"
                    },
                });

            res.redirect('/CODER');
        } catch (err) {
            errorHandler.handleRequestError(err)
            res.redirect('/CODER/err')
        }
    }

    static async GetTags(req, res) {
        try {
            const response = await axios.get(`${url}/tags`);
            return response.data
        } catch (err) {
            errorHandler.handleRequestError(err);
        }
    }

    static async Search(query) {
        try {
            const response = await axios.get(`${url}/search?search=${query}`);

            return response.data;
        } catch (err) {
            errorHandler.setError('Erreur lors de la recherche', 500)
        }
    }

    static async SearchTags(tag) {
        try {
            const response = await axios.get(`${url}/topics?tags=${tag}`);

            return response.data;
        } catch (err) {
            errorHandler.setError('Erreur lors de la recherche', 500)
        }
    }
}

module.exports = TreatmentTopic;