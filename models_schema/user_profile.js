const { Schema, model } = require("mongoose");

const user_schema = new Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        required: [true, "username is required!f"],
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
        // trim: true,
    },
    birthDate: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value) {
                const startDate = new Date('1960-01-01');
                const currentDate = new Date();
                return value >= startDate && value <= currentDate;
            },
        }
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    // { expires: 120 }
    // { timestamps: true }
);


const user_model = model('user_profiles', user_schema);

module.exports = user_model;