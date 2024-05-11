const user = require("../../models/userModel");

const userExists = async (req, res, next) => {
    const id = req.params.id;

    try {
        const userById = await user.getUserById(id);

        if (!userById) {
            return res.status(404).json({
                message: `User with id ${id} not found`,
                status: 404
            });
        }

        req.article = userById;
        next();
    } catch (err) {
        res.status(500).json({
            message: err,
            status: 500
        });
    }
};

module.exports =  userExists ;
