// Importation des modules
const express = require("express");
const routeur = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const controllerTemplate = require("../controller/controlTemplate");
const controllerTopic = require("../controller/controlTreatmentTopic");

// Configuration des routes Topics
routeur.get("/coder/create/topic", controllerTemplate.CreateTopic);
routeur.get("/coder/t/:name", controllerTemplate.GetTopic);
routeur.get("/coder/topic/:name/update", controllerTemplate.UpdateTopic);

// Route Traitement en rapport avec les Topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);
routeur.post("/treatment/update/topic/:id", upload.single('ProfileImage'), controllerTopic.UpdateTopic);

module.exports = routeur;
