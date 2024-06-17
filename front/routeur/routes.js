//Importation des modules
const express = require("express");
const routeur = express.Router();
const controller = require("../controller/control");

//Configuration des routes
routeur.get("/CODER", controller.Index);
routeur.get("/login", controller.Login)
routeur.get("/register", controller.Register)

routeur.post("/treatment/login", controller.LoginTreatment)
routeur.post("/treatment/register" , controller.RegisterTreatment)

//pour que nos routes soit accessible
module.exports = routeur