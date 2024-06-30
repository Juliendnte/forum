//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/user");
const middleware = {
    auth : require("../middlewares/auth/"),
    upload : require("../middlewares/multerConfig"),
}

//Configuration des routes
routeur.get("/user/:name", controllerUser.getUser)
routeur.get("/user", [middleware.auth.validateToken], controllerUser.getUser)
routeur.get("/admin", controllerUser.getAdminModo)
routeur.post("/login", controllerUser.Login);
routeur.post("/register", controllerUser.Register);
routeur.post("/forgotPassword", controllerUser.ForgotPassword)
routeur.post("/resetPassword", [middleware.auth.validateToken], controllerUser.ResetPassword);
routeur.post("/follow", [middleware.auth.validateToken], controllerUser.Follow);
routeur.post("/searchFriend", controllerUser.SearchFriend)
routeur.post("/searchFollow", controllerUser.SearchFollow)
routeur.get("/search", controllerUser.Search)
routeur.patch("/user/update", [middleware.auth.validateToken], controllerUser.UpdateUser)
routeur.post("/getLiked", [middleware.auth.validateToken], controllerUser.getLiked)
routeur.post('/upload/user', [middleware.auth.validateToken, middleware.upload('user')], controllerUser.UploadImage)

//Exportation des routes
module.exports = routeur;