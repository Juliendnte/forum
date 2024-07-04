// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");

// Route Template
routeur.get("/coder/recherche", controllerTemplate.SearchGlobal);

// Route Erreur
routeur.get("/:err", controllerTemplate.Error);

module.exports = routeur;
