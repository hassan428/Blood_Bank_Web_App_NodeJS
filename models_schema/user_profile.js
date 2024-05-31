const { Schema, model } = require("mongoose");

const user_schema = new Schema(
  {
    first_name: String,
    last_name: String,
    username: {
      type: String,
      required: [true, "username is required!"],
      unique: [true, "username already exist!"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "email already exist!"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minLength: 8,
    },
    birthDate: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const tenYearsAgo = new Date();
          tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
          const hundredYearsAgo = new Date();
          hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

          return value >= hundredYearsAgo && value <= tenYearsAgo;
        },
        message: "Birth Date must be between 10 to 100 years",
      },
    },
    gender: {
      type: String,
      required: [true, "gender is required!"],
    },
    bloodGroup: {
      type: String,
      required: [true, "bloodGroup is required!"],
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    login_count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const user_model = model("user_profiles", user_schema);

module.exports = user_model;
