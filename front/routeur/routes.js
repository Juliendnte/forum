// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");
const controllerTopic = require("../controller/controlTreatmentTopics");

// Configuration des routes Users
routeur.get("/CODER", controllerTemplate.Index);
routeur.get("/CODER/login", controllerTemplate.Login);
routeur.get("/CODER/register", controllerTemplate.Register);
routeur.get("/CODER/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/CODER/user/:name", controllerTemplate.ProfilUser);

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

// Route Traitement en rapport avec les Topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);

// Pour que nos routes soient accessibles
module.exports = routeur;
