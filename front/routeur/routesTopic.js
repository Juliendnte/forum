// Importation des modules
const express = require("express");
const routeur = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const controllerTemplate = require("../controller/controlTemplate");
const controllerTopic = require("../controller/controlTreatmentTopic");
const controllerUser = require("../controller/controlTreatmentUser");

// Route Template
routeur.get("/coder/create/topic", controllerTemplate.CreateTopic);
routeur.get("/coder/t/:name", controllerTemplate.GetTopic);
routeur.get("/coder/topic/:name/update", controllerTemplate.UpdateTopic);

// Route Traitement en rapport avec les Topics
routeur.post("/treatment/createTopic", controllerTopic.CreateTopicTreatment);
routeur.post("/treatment/update/topic/:name", upload.single('TopicImage'), controllerTopic.UpdateTopic);
routeur.get("/treatment/topic/add/:id/favorite", controllerUser.TreatmentUser.AddFavoriteTopic);
routeur.get("/treatment/topic/remove/:id/favorite", controllerUser.TreatmentUser.RemoveFavoriteTopic);
routeur.get("/treatment/delete/topic/:name", controllerTopic.DeleteTopic);

module.exports = routeur;
