// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const path = require("node:path");

// Route Template
routeur.get("/coder/recherche", controllerTemplate.SearchGlobal);
routeur.get("/coder/recherche/topic/:tag", controllerTemplate.SearchTag);
routeur.get("/coder/terms-and-conditions", controllerTemplate.Conditions);
// Route Erreur
routeur.get("/coder/:err", controllerTemplate.Error);

module.exports = routeur;