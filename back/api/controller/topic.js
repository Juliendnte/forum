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
        .map(([key, value]) =>`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
    return filteredQuery ? `?${filteredQuery}` : "";
}

class TopicController {
    static async getTopics(req, res) {
        try {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || pagination;
            const href = baseUrl + "/topics" + buildQueryWithoutLimitOffset(req.query);

            req.query.limit = limit;
            req.query.offset = offset;

            const topics = await topic.getAllTopic(req.query);
            for (const top of topics) {
                top.Path = `${baseUrl}/assets/${top.Path}`;
            }

            const total = Object.entries(topic).length; //Pour savoir j'ai combien d'article
            if (!topics || total === 0) {
                return res.status(404).send({
                    message: `Topics not found`,
                    status: 404,
                });
            }
            const last_page = Math.ceil(topic.total / limit);
            const current_page = Math.ceil(offset / limit) + 1;
            const next =  topic.total - limit <= offset ? null : href.includes("?") ? `${href}&limit=${limit}&offset=${offset + limit}`: `${href}?limit=${limit}&offset=${offset + limit}`; //Si article.total et total sont égaux alors pas de suivant
            const previous = offset ? href.includes("?") ? `${href}&limit=${limit}&offset=${offset - limit}` : `${href}?limit=${limit}&offset=${offset - limit}` : null; //Si l'offset est différent de 0 pagination sinon y en a pas


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

        }catch (err){
            res.status(500).send({
                message: err ,
                status:500
            });
        }
    }

    static getTopic(req, res) {
        const topicById = req.topic;
        try{
            topicById.Path = `${baseUrl}/assets/${topicById.Path}`;

            return res.status(200).send({
                message: `Article with id ${req.params.id} successfully found`,
                status: 200,
                topic: topicById,
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async postTopic(req,res){
        const {Title} = req.body;
        const Id_User = req.user.Sub;
        if (!Title || !Id_User){
            return res.status(400).send({
                message: "Le champ Title est requis.",
                status: 400
            })
        }

        try{
            const NewTopic = await topic.createTopic({
                Title,
                Id_User
            });

            return  res.status(201).send({
                message: `Topic successfully created`,
                status: 201,
                NewTopic
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            });
        }
    }

    static async patchTopic(req,res){
        const id = req.params.id
        const body = req.body;

        //Check si une clé du body appartient a cette liste
        if (!body || !Object.keys(body).some(key => ["Title", "Description", "Id_Status", "Id_User"].includes(key))) {
            return res.status(400).send({
                message: "Au moins un des champs (Title, Description, Id_Status, Id_User) doit être modifié",
                status: 400
            });
        }

        try{
            await topic.updatePatchTopic(id, body);

            return res.status(200).send({
                message: `Topic with id ${id} successfully updated`,
                status: 200,
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status:500
            });
        }
    }

    static async deleteTopic(req,res){
        const id = req.params.id;
        try {
            await topic.deleteTopic(id);

            return res.status(200).send({
                message: `Topic with id ${id} successfully delete`,
                status: 200
            })
        }catch (err){
            res.status(500).send({
                message: err ,
                status:500
            });
        }
    }

    static async UploadImage (req,res){
        const filePath = req.file.path.replace('assets', '');
        const id = req.user.Sub;
        try {
            await topic.updatePatchTopic(id, {Path: filePath})
            res.download(filePath, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err,
                        status: 500
                    })
                }
            });
        }catch (err){
            res.status(500).send({
                message: err,
                status: 500
            })
        }
    }
}

module.exports = TopicController