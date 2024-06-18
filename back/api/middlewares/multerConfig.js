const multer = require('multer');
const path = require('path');

// Middleware pour gérer le téléchargement avec un chemin dynamique
const upload = (destination) => {
    // Création d'une nouvelle instance de multer pour chaque appel avec un chemin de destination différent
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('assets', destination));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
        }
    });

    return multer({ storage: storage });
};

module.exports = upload;
