// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerMessage = require("../controller/controlTreatmentMessage");

// Route Template
routeur.get("/coder/m/:id", controllerTemplate.GetMessage);
routeur.get("/coder/message/:id/update", controllerTemplate.UpdateMessage);

// Route Treatment en rapport avec les Messages
routeur.post("/treatment/update/message/:id", controllerMessage.UpdateMessage)

module.exports = routeur;