//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/user");
const middleware = {
    validateToken : require("../middlewares/auth"),
}

//Configuration des routes CRUD
routeur.post("/login", controllerUser.Login);
routeur.post("/register", controllerUser.Register);
routeur.post("/forgotPassword", controllerUser.ForgotPassword)
routeur.post("/resetPassword", middleware.validateToken, controllerUser.ResetPassword);
routeur.get("/user", middleware.validateToken, controllerUser.getUser)


//Exportation des routes
module.exports = routeur;