const multer = require('multer');
const path = require('path');

// Middleware pour gérer le téléchargement avec un chemin dynamique
const upload = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('Setting destination:', path.join('assets', destination));
            cb(null, path.join('assets', destination));
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            console.log('Generating filename:', uniqueSuffix + path.extname(file.originalname));
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    const uploadMiddleware = multer({ storage: storage }).single('image');
    return (req, res, next) => {
        uploadMiddleware(req, res, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            console.log('File uploaded:', req.file); // Debug
            next();
        });
    };
};

module.exports = upload;
