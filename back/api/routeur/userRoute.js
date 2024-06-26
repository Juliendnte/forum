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
routeur.post("/login", controllerUser.Login);
routeur.post("/register", controllerUser.Register);
routeur.post("/forgotPassword", controllerUser.ForgotPassword)
routeur.post("/resetPassword", [middleware.auth.validateToken], controllerUser.ResetPassword);
routeur.get("/user", [middleware.auth.validateToken], controllerUser.getUser)
routeur.post("/searchFriend", controllerUser.SearchFriend)
routeur.post("/searchFollow", controllerUser.SearchFollow)
routeur.patch("/user/update", [middleware.auth.validateToken], controllerUser.UpdateUser)
routeur.post('/upload/user', [middleware.auth.validateToken, middleware.upload('user').single('image')], controllerUser.UploadImage)

//Exportation des routes
module.exports = routeur;