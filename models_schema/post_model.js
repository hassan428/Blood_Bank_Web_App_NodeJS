const { Schema, model } = require("mongoose");

const post_schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user_profiles",
    },
    image: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const post_model = model("post", post_schema);
module.exports = post_model;