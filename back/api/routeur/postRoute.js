//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerPost = require("../controller/post");
const middleware = {
    validateToken : require("../middlewares/auth"),
    postExists: require("../middlewares/Exists/postExist"),
}

//Configuration des routes CRUD
routeur.get("/posts", controllerPost.getPosts);
routeur.get("/post/:id",middleware.postExists , controllerPost.getPost);
routeur.post("/post",middleware.validateToken ,controllerPost.postPost);
routeur.put("/post/:id", [middleware.validateToken,middleware.postExists] ,controllerPost.putPost);
routeur.patch("/post/:id",[middleware.validateToken,middleware.postExists],controllerPost.patchPost)
routeur.delete("/post/:id",[middleware.validateToken, middleware.postExists] ,controllerPost.deletePost);

//Exportation des routes
module.exports = routeur;