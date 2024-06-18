const post = require("../../models/messageModel");

const postExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const messageById = await post.getMessageById(id);

        if (!messageById) {
            return res.status(404).send({
                message: `Message with id ${id} not found`,
                status: 404
            });
        }

        req.message = messageById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  postExists ;
