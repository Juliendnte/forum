// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerMessage = require("../controller/controlTreatmentMessage");
const controllerPost = require("../controller/controlTreatmentPost");

// Route Template
routeur.get("/coder/m/:id", controllerTemplate.GetMessage);
routeur.get("/coder/post/:id/create/message", controllerTemplate.CreateMessage);
routeur.get("/coder/message/:id/update", controllerTemplate.UpdateMessage);

// Route Treatment en rapport avec les Messages
routeur.post("/treatment/update/message/:id", controllerMessage.UpdateMessage)
routeur.post("/treatment/create/message", controllerMessage.CreateMessage)

module.exports = routeur;