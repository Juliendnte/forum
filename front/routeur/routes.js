// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");
const controllerTopic = require("../controller/controlTreatmentTopic");
const controllerPost = require("../controller/controlTreatmentPost");

// Configuration des routes Users
routeur.get("/CODER", controllerTemplate.Index);
routeur.get("/CODER/login", controllerTemplate.Login);
routeur.get("/CODER/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/CODER/user/:name", controllerTemplate.ProfilUser);
routeur.get("/CODER/:nametopic/create/post", controllerTemplate.CreatePost);
routeur.get("/CODER/profil/:name/update", controllerTemplate.UpdateProfil);
routeur.get("/CODER/topic/:name/update", controllerTemplate.UpdateTopic);
// routeur.get("/CODER/post/:id/update", controllerTemplate.UpdatePost);

// Configuration des routes Topics
routeur.get("/CODER/create/topic", controllerTemplate.CreateTopic);
routeur.get("/CODER/t/:name", controllerTemplate.GetTopic);

// Configuration des routes Posts
routeur.get("/CODER/p/:id", controllerTemplate.GetPost);

// Route Traitement en rapport avec le User
routeur.post("/treatment/login", controllerUser.TreatmentUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.TreatmentUser.RegisterTreatment);
routeur.get("/treatment/disconnect", controllerUser.TreatmentUser.DisconnectTreatment);
routeur.get("/treatment/follow/:id", controllerUser.TreatmentUser.FollowUser)
routeur.post("/treatment/update/user", controllerUser.TreatmentUser.UpdateUser);

// Route Traitement en rapport avec les Topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);
routeur.post("/treatment/update/topic/:id", controllerTopic.UpdateTopic);

// Route Traitement en rapport avec les Posts
routeur.post("/treatment/create/post", controllerPost.CreatePost)
routeur.get("/treatment/like/post/:id", controllerPost.LikePost)
routeur.get("/treatment/unlike/post/:id", controllerPost.UnLikePost)
// routeur.get("/CODER/treatment/post/:id", controllerPost.FavPost)

// Route Erreur
routeur.get("/CODER/:err", controllerTemplate.Error)

// Pour que nos routes soient accessibles
module.exports = routeur;
