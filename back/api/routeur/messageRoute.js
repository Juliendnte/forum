//Importation des modules
const express = require("express");
const routeur = express.Router();
const messageController = require("../controller/message");
const middleware = {
    auth : require("../middlewares/auth/"),
    messageExist: require("../middlewares/Exists/messageExist"),
    Owner: require("../middlewares/Owner/messageOwn")
}

//Configuration des routes
routeur.get("/messages", messageController.getMessages);
routeur.get("/message/:id",[middleware.messageExist] , messageController.getMessage);
routeur.post("/message",[middleware.auth.validateToken] ,messageController.postMessage);
routeur.patch("/message/:id",[middleware.auth.validateToken ,middleware.messageExist, middleware.Owner.messageOwn],messageController.patchMessage)
routeur.delete("/message/:id",[middleware.auth.validateToken, middleware.messageExist, middleware.Owner.everyRight] ,messageController.deleteMessage);

//Exportation des routes
module.exports = routeur;