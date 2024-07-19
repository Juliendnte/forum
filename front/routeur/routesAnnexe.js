// Importation des modules
const express = require("express");
const routeur = express.Router();
const controllerTemplate = require("../controller/controlTemplate");
const controllerUser = require("../controller/controlTreatmentUser");

// Route Template
routeur.get("/coder/recherche", controllerTemplate.SearchGlobal);
routeur.get("/coder/recherche/topic/:tag", controllerTemplate.SearchTag);
routeur.get("/coder/terms-and-conditions", controllerTemplate.Conditions);
routeur.get("/coder/vos_favoris", controllerTemplate.FavPage);
routeur.get("/coder/talking_over", controllerTemplate.TalkingOver)
routeur.post("/treatment/forgotpwd", controllerUser.TreatmentUser.ForgotPwd)
routeur.get("/coder/resetPassword", controllerTemplate.ResetPassword)
routeur.post("/treatment/reset/password/:token", controllerUser.TreatmentUser.resetPwd)
routeur.get("/coder/password/validation", controllerTemplate.ValidPassword)

// Route Erreur
routeur.get("/coder/:err", controllerTemplate.Error);

module.exports = routeur;
