const { Schema, model } = require("mongoose");

const codes_schmea = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "user_profiles",
    },
    code: {
      type: String,
      required: true,
    },
    typeWrongCode: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const code_model = model("user_codes", codes_schmea);

module.exports = code_model;
