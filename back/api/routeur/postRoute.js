//Importation des modules
const express = require("express");
const routeur = express.Router();
const PostController = require("../controller/post");
const middleware = {
    auth : require("../middlewares/auth/"),
    postExists: require("../middlewares/Exists/postExist"),
    Owner: require("../middlewares/Owner/postOwn")
}

//Configuration des routes
routeur.get("/postsMiddleware" ,[middleware.auth.validateToken] ,PostController.getPostsMiddleware);
routeur.get("/posts", PostController.getPosts);
routeur.get("/post/:id",[middleware.postExists] , PostController.getPost);
routeur.get("/postMiddleware/:id",[middleware.auth.validateToken] , PostController.getPostMiddleware)
routeur.get("/getLiked",[middleware.auth.validateToken] , PostController.getLiked);
routeur.post("/like", [middleware.auth.validateToken], PostController.Like);
routeur.post("/unlike", [middleware.auth.validateToken], PostController.UnLike);
routeur.post("/post", [middleware.auth.validateToken] ,PostController.postPost);
routeur.patch("/post/:id",[middleware.auth.validateToken, middleware.postExists, middleware.Owner.postOwn],PostController.patchPost)
routeur.delete("/post/:id",[middleware.auth.validateToken, middleware.postExists, middleware.Owner.everyRight] ,PostController.deletePost);

//Exportation des routes
module.exports = routeur;