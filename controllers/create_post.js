const post_model = require("../models_schema/post_model");

const create_post = async (req, res) => {
    try {
        const { user, body } = req;
        const post_create = new post_model({
            user_id: user._id,
            ...body,
        });
        await post_create.save();

        return res.json({
            message: "Post Created", post_create,
        });
    } catch (error) {

        return res.status(500).json({
            message: "something went wrong!",
            error: error.message,
        });

    }
};


module.exports = create_post;