// Importation des modules
const express = require("express");
const routeur = express.Router();
const ControlTemplate = require("../controller/controlTemplate");
const controlUser = require("../controller/controlTreatmentUser");

// Instantiate the ControlTemplate class
const controllerTemplate = new ControlTemplate();
const controllerUser = new controlUser();

// Configuration des routes
routeur.get("/CODER", controllerTemplate.Index);
routeur.get("/CODER/login", controllerTemplate.Login);
routeur.get("/CODER/register", controllerTemplate.Register);
routeur.get("/CODER/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/CODER/profil", controllerTemplate.ProfilUser);

// Route Traitement en rapport avec le user
routeur.post("/treatment/login", controllerUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.RegisterTreatment);
// routeur.post("/treatment/forgotpwd", controllerUser);
// routeur.post("/treatment/followUser", controllerUser);

// Pour que nos routes soient accessibles
module.exports = routeur;
