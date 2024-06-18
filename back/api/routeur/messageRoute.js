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
routeur.get("/posts", messageController.getMessages);
routeur.get("/post/:id",middleware.messageExist , messageController.getMessage);
routeur.post("/post",middleware.auth.validateToken ,messageController.postMessage);
routeur.patch("/post/:id",[middleware.auth.validateToken ,middleware.messageExist, middleware.Owner.messageOwn],messageController.patchMessage)
routeur.delete("/post/:id",[middleware.auth.validateToken, middleware.messageExist, middleware.Owner.everyRight] ,messageController.deleteMessage);

//Exportation des routes
module.exports = routeur;