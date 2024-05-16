//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/user");
const middleware = {
    validateToken : require("../middlewares/auth"),
    bodyParser: require("../middlewares/bodyParser"),
    userExists: require("../middlewares/Exists/userExist"),
}

//Configuration des routes CRUD
routeur.get("/users",  controllerUser.getUsers);
routeur.get("/user/:id",middleware.userExists, controllerUser.getUser);
routeur.post("/user",[middleware.validateToken, middleware.bodyParser] ,controllerUser.postUser);
routeur.put("/user/:id",[middleware.validateToken,middleware.userExists, middleware.bodyParser] ,controllerUser.putUser);
routeur.patch("/user/:id",[middleware.validateToken,middleware.userExists , middleware.bodyParser] ,controllerUser.patchUser);
routeur.delete("/user/:id",[middleware.validateToken, middleware.userExists] ,controllerUser.deleteUser);

//Exportation des routes
module.exports = routeur;