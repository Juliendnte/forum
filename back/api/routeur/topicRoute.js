//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTopic = require("../controller/topic");
const middleware = {
    validateToken : require("../middlewares/auth"),
    topicExists: require("../middlewares/Exists/topicExist"),
}

//Configuration des routes CRUD
routeur.get("/topics", controllerTopic.getTopics);
routeur.get("/topic/:id",middleware.topicExists , controllerTopic.getTopic);
routeur.post("/topic",middleware.validateToken ,controllerTopic.postTopic);
routeur.put("/topic/:id", [middleware.validateToken,middleware.topicExists] ,controllerTopic.putTopic);
routeur.patch("/topic/:id",[middleware.validateToken,middleware.topicExists],controllerTopic.patchTopic)
routeur.delete("/topic/:id",[middleware.validateToken, middleware.topicExists] ,controllerTopic.deleteTopic);

//Exportation des routes
module.exports = routeur;