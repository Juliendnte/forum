//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTopic = require("../controller/topic");
const middleware = {
    validateToken : require("../middlewares/auth"),
    bodyParser: require("../middlewares/bodyParser"),
    topicExists: require("../middlewares/Exists/topicExist"),
}

//Configuration des routes CRUD
routeur.get("/topics", controllerTopic.getTopics);
routeur.get("/topic/:id",middleware.topicExists , controllerTopic.getTopic);
routeur.post("/topic",[middleware.validateToken, middleware.bodyParser] ,controllerTopic.postTopic);
routeur.put("/topic/:id", [middleware.validateToken,middleware.topicExists,middleware.bodyParser] ,controllerTopic.putTopic);
routeur.patch("/topic/:id",[middleware.validateToken,middleware.topicExists,middleware.bodyParser],controllerTopic.patchTopic)
routeur.delete("/topic/:id",[middleware.validateToken, middleware.topicExists] ,controllerTopic.deleteTopic);

//Exportation des routes
module.exports = routeur;