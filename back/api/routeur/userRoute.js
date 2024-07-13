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
routeur.get("/ban",[middleware.auth.isAdmin], controllerUser.Ban);
routeur.post("/follow", [middleware.auth.validateToken], controllerUser.Follow);
routeur.post("/searchFriend", controllerUser.SearchFriend)
routeur.post("/searchFollow", controllerUser.SearchFollow)
routeur.get("/search", controllerUser.Search)
routeur.get("/getFav", [middleware.auth.validateToken], controllerUser.getFav)
routeur.post("/FavTopic/delete", [middleware.auth.validateToken] ,controllerUser.deleteFavTopic)
routeur.post("/FavTopic", [middleware.auth.validateToken] , controllerUser.postFavTopic)
routeur.post("/FavPost/delete", [middleware.auth.validateToken],controllerUser.deleteFavPost)
routeur.post("/FavPost", [middleware.auth.validateToken] , controllerUser.postFavPost)
routeur.patch("/user/update", [middleware.auth.validateToken, middleware.upload('user','ProfileImage')], controllerUser.UpdateUser)

//Exportation des routes
module.exports = routeur;