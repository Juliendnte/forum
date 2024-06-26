const topic = require("../models/topicModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const pagination = 5;

/**
 * Function that build a query without limit and offset
 * @param query The query
 * @returns {string|string} The query without limit and offset
 */
function buildQueryWithoutLimitOffset(query) {
    const filteredQuery = Object.entries(query).filter(([key]) => key.toLowerCase() !== "limit" && key.toLowerCase() !== "offset")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
    return filteredQuery ? `?${filteredQuery}` : "";
}
/**
 * TopicController class.
 * @class
 */
class TopicController {
    /**
     * Get all topics with pagination.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a list of topics.
     */
    static async getTopics(req, res) {
        try {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || pagination;
            const href = `${baseUrl}/topics${buildQueryWithoutLimitOffset(req.query)}`;

            const topics = await topic.getAllTopic({ ...req.query, limit, offset });
            topics.forEach(top => top.Path = `${baseUrl}/assets/${top.Path}`);

            if (!topics.length) {
                return res.status(404).send({ message: `Topics not found`, status: 404 });
            }

            const total = topics.length;
            const last_page = Math.ceil(total / limit);
            const current_page = Math.ceil(offset / limit) + 1;
            const next = total - limit <= offset ? null : `${href}&limit=${limit}&offset=${offset + limit}`;
            const previous = offset ? `${href}&limit=${limit}&offset=${offset - limit}` : null;

            return res.status(200).send({
                message: `Topics successfully found`,
                status: 200,
                articles: {
                    href,
                    offset,
                    limit,
                    next,
                    previous,
                    total,
                    last_page,
                    current_page,
                    items: topics,
                }
            });

        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Get a specific topic by its ID.
     * @param {Object} req - The request object, containing the topic ID in the parameters.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a specific topic.
     */
    static getTopic(req, res) {
        try {
            const topicById = req.topic;
            topicById.Path = `${baseUrl}/assets/${topicById.Path}`;
            topicById.TagPath = `${baseUrl}/assets${topicById.TagPath}`;

            return res.status(200).send({
                message: `Article with id ${req.params.id} successfully found`,
                status: 200,
                topic: topicById,
            });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Get all tags.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a list of tags.
     */
    static async getTags(req, res) {
        try {
            const tags = await topic.getTags();
            tags.forEach(tag => tag.Path = `${baseUrl}/assets${tag.Path}`);

            res.status(200).send({ message: "Tags successfully found", status: 200, tags });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Create a new topic.
     * @param {Object} req - The request object, containing the new topic details in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async postTopic(req, res) {
        const { Title } = req.body;
        const Id_User = req.user.Sub;

        if (!Title || !Id_User) {
            return res.status(400).send({ message: "Le champ Title est requis.", status: 400 });
        }

        try {
            const NewTopic = await topic.createTopic({ Title, Id_User });

            return res.status(201).send({ message: `Topic successfully created`, status: 201, NewTopic });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Update a specific topic by its ID.
     * @param {Object} req - The request object, containing the topic ID in the parameters and the new details in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async patchTopic(req, res) {
        const id = req.params.id;
        const body = req.body;

        if (!body || !Object.keys(body).some(key => ["Title", "Description", "Id_Status", "Id_User"].includes(key))) {
            return res.status(400).send({ message: "Au moins un des champs (Title, Description, Id_Status, Id_User) doit être modifié", status: 400 });
        }

        try {
            await topic.updatePatchTopic(id, body);

            return res.status(200).send({ message: `Topic with id ${id} successfully updated`, status: 200 });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Delete a specific topic by its ID.
     * @param {Object} req - The request object, containing the topic ID in the parameters.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async deleteTopic(req, res) {
        const id = req.params.id;

        try {
            await topic.deleteTopic(id);

            return res.status(200).send({ message: `Topic with id ${id} successfully delete`, status: 200 });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }

    /**
     * Upload an image for a specific topic.
     * @param {Object} req - The request object, containing the image file in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async UploadImage(req, res) {
        const filePath = req.file.path.replace('assets', '');
        const id = req.user.Sub;

        try {
            await topic.updatePatchTopic(id, { Path: filePath });
            res.download(filePath, err => {
                if (err) {
                    res.status(500).send({ message: err, status: 500 });
                }
            });
        } catch (err) {
            res.status(500).send({ message: err, status: 500 });
        }
    }
}

module.exports = TopicController;

module.exports = TopicController