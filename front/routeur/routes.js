//Importation des modules
const express = require("express");
const routeur = express.Router();
const controller = require("../controller/control");

//Configuration des routes
routeur.get("/index", controller.Index);

//pour que nos routes soit accessible
module.exports = routeur