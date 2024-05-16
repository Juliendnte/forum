const post = require("../../models/postModel");

const postExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const postById = await post.getpostById(id);

        if (!postById) {
            return res.status(404).json({
                message: `User with id ${id} not found`,
                status: 404
            });
        }

        req.article = postById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  postExists ;
