//Importation des modules
const express = require("express");
const routeur = express.Router();
const TopicController = require("../controller/topic");
const middleware = {
    auth : require("../middlewares/auth/"),
    topicExists: require("../middlewares/Exists/topicExist"),
    upload : require("../middlewares/multerConfig"),
    Owner: require("../middlewares/Owner/topicOwn")
}

//Configuration des routes
routeur.get("/topics", TopicController.getTopics);
routeur.get("/topicsMiddleware", middleware.auth.validateToken ,TopicController.getTopicsMiddleware);
routeur.get("/tags", TopicController.getTags)
routeur.get("/topic/:name",middleware.topicExists , TopicController.getTopic);
routeur.post("/topic",middleware.auth.validateToken ,TopicController.postTopic);
routeur.patch("/topic/:id",[middleware.auth.validateToken, middleware.topicExists, middleware.Owner.topicOwn],TopicController.patchTopic)
routeur.delete("/topic/:id",[middleware.auth.validateToken, middleware.topicExists, middleware.Owner.everyRight] ,TopicController.deleteTopic);
routeur.post("/upload/topic/:id", [middleware.auth.validateToken, middleware.topicExists, middleware.Owner.topicOwn, middleware.upload('topic')], TopicController.UploadImage)


//Exportation des routes
module.exports = routeur;