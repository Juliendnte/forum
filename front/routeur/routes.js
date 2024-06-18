//Importation des modules
const express = require("express");
const routeur = express.Router();
const controller = require("../controller/control");

//Configuration des routes
routeur.get("/CODER", controller.Index);
routeur.get("/CODER/login", controller.Login)
routeur.get("/CODER/register", controller.Register)
routeur.get("/CODER/mot_de_passe_oublie", controller.ForgotPwd)
routeur.get("/CODER/profil", controller.ProfilUser)

routeur.post("/treatment/login", controller.LoginTreatment)
routeur.post("/treatment/register" , controller.RegisterTreatment)
routeur.post("/treatment/forgotpwd" , controller.RegisterTreatment)

//pour que nos routes soit accessible
module.exports = routeur