const multer = require('multer');
const path = require('path');

// Middleware pour gérer le téléchargement avec un chemin dynamique
const upload = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('assets', destination));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + path.extname(file.originalname));
        }
    });
    const uploadMiddleware = multer({ storage: storage }).single('image');
    return (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            next();
        });
    };
};

module.exports = upload;
