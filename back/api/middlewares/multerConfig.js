const multer = require('multer');
const path = require('path');

// Middleware pour gérer le téléchargement avec un chemin dynamique
const upload = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('Setting destination:', path.join('assets', destination));
            cb(null, path.join('api/assets', destination));
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            console.log('Generating filename:', uniqueSuffix + path.extname(file.originalname));
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    return multer({ storage: storage }).single('ProfileImage');
};

module.exports = upload;
