// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");

// Configuration des routes
routeur.get("/CODER", controllerTemplate.Index);
routeur.get("/CODER/login", controllerTemplate.Login);
routeur.get("/CODER/register", controllerTemplate.Register);
routeur.get("/CODER/accounts/password/reset/", controllerTemplate.ForgotPwd);
routeur.get("/CODER/profil", controllerTemplate.ProfilUser);

// Route Traitement en rapport avec le user
routeur.post("/treatment/login", controllerUser.LoginTreatment);
routeur.post("/treatment/register", controllerUser.RegisterTreatment);
routeur.get("/treatment/disconnect", controllerUser.DisconnectTreatment)
// routeur.post("/treatment/forgotpwd", controllerUser);
// routeur.post("/treatment/followUser", controllerUser);

// Pour que nos routes soient accessibles
module.exports = routeur;
