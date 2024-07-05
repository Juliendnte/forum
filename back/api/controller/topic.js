const topic = require("../models/topicModel");
require('dotenv').config();
const baseUrl = process.env.BASE_URL;

const pagination = 10;

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

            const topics = await topic.getAllTopic({...req.query, limit, offset});
            topics.forEach(top => top.Path = `${baseUrl}/assets/${top.Path}`);

            if (!topics.length) {
                return res.status(404).send({message: `Topics not found`, status: 404});
            }

            const total = topics.length;

            return res.status(200).send({
                message: `Topics successfully found`,
                status: 200,
                topics: {
                    href,
                    offset,
                    limit,
                    next: total - limit <= offset ? null : `${href}&limit=${limit}&offset=${offset + limit}`,
                    previous: offset ? `${href}&limit=${limit}&offset=${offset - limit}` : null,
                    total,
                    last_page: Math.ceil(total / limit),
                    current_page: Math.ceil(offset / limit) + 1,
                    items: topics,
                }
            });

        } catch (err) {
            res.status(500).send({message: err, status: 500});
        }
    }


    static async getTopicsMiddleware(req, res) {
        try {
            const userId = req.user.Sub;
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || pagination;
            const href = `${baseUrl}/topics${buildQueryWithoutLimitOffset(req.query)}`;

            const topics = await topic.getAllTopicMiddleware({...req.query, limit, offset}, userId);
            topics.forEach(top => top.Path = `${baseUrl}/assets/${top.Path}`);

            if (!topics.length) {
                return res.status(404).send({message: `Topics not found`, status: 404});
            }

            const total = topics.length;

            return res.status(200).send({
                message: `Topics successfully found`,
                status: 200,
                topics: {
                    href,
                    offset,
                    limit,
                    next: total - limit <= offset ? null : `${href}&limit=${limit}&offset=${offset + limit}`,
                    previous: offset ? `${href}&limit=${limit}&offset=${offset - limit}` : null,
                    total,
                    last_page: Math.ceil(total / limit),
                    current_page: Math.ceil(offset / limit) + 1,
                    items: topics,
                }
            });

        } catch (err) {
            res.status(500).send({message: err, status: 500});
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
            topicById.User.Path = `${baseUrl}/assets/${topicById.User.Path}`;
            topicById.TopicPath = `${baseUrl}/assets/${topicById.TopicPath}`;
            topicById.Tag.forEach(tag => tag.Path = `${baseUrl}/assets${tag.Path}`);
            topicById.Posts.forEach(post => post.User.Path = `${baseUrl}/assets/${post.User.Path}`);
            return res.status(200).send({
                message: `Topic with name ${req.params.name} successfully found`,
                status: 200,
                topic: topicById,
            });
        } catch (err) {
            res.status(500).send({message: err, status: 500});
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

            res.status(200).send({message: "Tags successfully found", status: 200, tags});
        } catch (err) {
            res.status(500).send({message: err, status: 500});
        }
    }

    /**
     * Create a new topic.
     * @param {Object} req - The request object, containing the new topic details in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async postTopic(req, res) {
        const {Title, Status, Content} = req.body;
        const Id_User = req.user.Sub;

        if (!Title || !Status || !Id_User || !Content) {
            return res.status(400).send({message: "Les champs Title , Status et Content sont requis.", status: 400});
        }

        if (Title.includes(' ')) {
            return res.status(400).send({message: "Le titre ne doit pas contenir d'espace.", status: 400});
        }

        try {
            const NewTopic = await topic.createTopic({Title, Status, Id_User, Content});
            return res.status(201).send({message: `Topic successfully created`, status: 201, NewTopic});
        } catch (err) {
            res.status(500).send({message: err, status: 500});
        }
    }

    /**
     * Update a specific topic by its ID.
     * @param {Object} req - The request object, containing the topic ID in the parameters and the new details in the body.
     * @param {Object} res - The response object.
     * @returns {Object} - The response object, containing a success message.
     */
    static async patchTopic(req, res) {
        const id = req.user.Sub;
        const body = req.body;
        while (typeof body.Tags == 'string'){
            body.Tags = JSON.parse(body.Tags);
        }

        console.log(body)

        let filePath;
        if (req.file) {
            filePath = req.file.path;
            body.Path = filePath.replace('api\\assets', '');
        }
        try {
            await topic.updatePatchTopic(id, body);
            if (req.file) {
                return res.download(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            return res.status(200).send({message: `Topic with id ${id} successfully updated`, status: 200});
        } catch (err) {
            res.status(500).send({message: err, status: 500});
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

            return res.status(200).send({message: `Topic with id ${id} successfully delete`, status: 200});
        } catch (err) {
            res.status(500).send({message: err, status: 500});
        }
    }
}

module.exports = TopicController;

module.exports = TopicController