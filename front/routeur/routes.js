// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");
const controllerTopic = require("../controller/controlTreatmentTopics");

// Configuration des routes
routeur.get("/CODER", controllerTemplate.Index);
routeur.get("/CODER/login", controllerTemplate.Login);
routeur.get("/CODER/register", controllerTemplate.Register);
routeur.get("/CODER/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/CODER/user/:name", controllerTemplate.ProfilUser);
routeur.get("/CODER/create/topic", controllerTemplate.CreateTopic);
routeur.get("/CODER/t/:id", controllerTemplate.GetTopic);

// Route Traitement en rapport avec le user
routeur.post("/treatment/login", controllerUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.RegisterTreatment);
routeur.get("/treatment/disconnect", controllerUser.DisconnectTreatment);

// Route Traitement en rapport avec les topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);

// Pour que nos routes soient accessibles
module.exports = routeur;
