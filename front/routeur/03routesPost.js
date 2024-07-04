// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");


// Configuration des routes Posts
const controllerPost = require("../controller/controlTreatmentPost");
routeur.get("/coder/:nametopic/create/post", controllerTemplate.CreatePost);
routeur.get("/coder/p/:id", controllerTemplate.GetPost);
routeur.get("/coder/post/:id/update", controllerTemplate.UpdatePost);


// Route Traitement en rapport avec les Posts
routeur.post("/treatment/create/post", controllerPost.CreatePost)
routeur.get("/treatment/like/post/:id", controllerPost.LikePost)
routeur.get("/treatment/unlike/post/:id", controllerPost.UnLikePost)
routeur.post("/treatment/update/post/:id", controllerPost.UpdatePost)
routeur.get("/treatment/delete/post/:id", controllerPost.DeletePost)

module.exports = routeur;