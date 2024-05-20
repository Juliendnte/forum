//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/user");
const middleware = {
    validateToken : require("../middlewares/auth"),
    userExists: require("../middlewares/Exists/userExist"),
}

//Configuration des routes CRUD
routeur.get("/user/:id",middleware.userExists, controllerUser.getUser);
routeur.post("/login",middleware.validateToken ,controllerUser.postUser);
routeur.post("/register",middleware.validateToken ,controllerUser.postUser);
routeur.patch("/user/:id",[middleware.validateToken,middleware.userExists ] ,controllerUser.patchUser);
routeur.delete("/user/:id",[middleware.validateToken, middleware.userExists] ,controllerUser.deleteUser);


//Exportation des routes
module.exports = routeur;