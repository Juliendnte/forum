const multer = require('multer');
const path = require('path');

// Middleware pour gérer le téléchargement avec un chemin dynamique
const upload = (destination, nameInput) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(path.join('api/assets', destination))
            cb(null, path.join('api/assets', destination));
        },
        filename: function (req, file, cb) {
            console.log(path.extname(file.originalname))
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    return multer({ storage: storage }).single(nameInput);
};

module.exports = upload;
