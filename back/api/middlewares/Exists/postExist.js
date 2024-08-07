const post = require("../../models/postModel");

const postExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const postById = await post.getpostById(id);

        if (!postById) {
            return res.status(404).send({
                message: `Post with id ${id} not found`,
                status: 404
            });
        }

        req.post = postById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  postExists ;
