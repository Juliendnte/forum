//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTopic = require("../controller/topic");
const validateToken = require("../middlewares/auth");

//Configuration des routes CRUD
routeur.get("/topics", validateToken, controllerTopic.getTopics);
routeur.get("/topic/:id",validateToken , controllerTopic.getTopic);
routeur.post("/topic",validateToken ,controllerTopic.postTopic);
routeur.put("/topic/:id",validateToken ,controllerTopic.putTopic);
routeur.delete("/topic/:id",validateToken ,controllerTopic.deleteTopic);

//Exportation des routes
module.exports = routeur;