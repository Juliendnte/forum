//Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerUser = require("../controller/controlTreatmentUser");
const controllerPage = require("../controller/controlPage");

//Configuration des routes
routeur.get("/CODER", controllerPage.Index);
routeur.get("/CODER/login", controllerPage.Login)
routeur.get("/CODER/register", controllerPage.Register)
routeur.get("/CODER/accounts/password/reset/", controllerPage.ForgotPwd)
routeur.get("/CODER/profil", controllerPage.ProfilUser)

// Route Traitement en rapport avec le user
routeur.post("/treatment/login", controllerUser.LoginTreatment)
routeur.post("/treatment/register", controllerUser.RegisterTreatment)
routeur.post("/treatment/forgotpwd", controllerUser.ForgotPwdTreatment)
routeur.post("/treatment/followUser", controllerUser.FollowUserTreatment)

//pour que nos routes soit accessible
module.exports = routeur