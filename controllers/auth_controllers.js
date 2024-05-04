const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { email_send } = require("../services/nodemailer_service");
const { generateOtp } = require("../services/genereate_otp");
const user_model = require("../models_schema/user_profile");
const code_model = require("../models_schema/user_codes");

const { GENSALT, JWT_SECRET, COOKIE_AUTH_NAME } = process.env;

const users_signUp = async (req, res) => {

    try {
        const { body } = req;
        const { password, username, email } = body;

        const genSalt = bcrypt.genSaltSync(+GENSALT);
        const hash = bcrypt.hashSync(password, genSalt);


        const create_user = await user_model.create({ ...body, password: hash, });
        const { _id } = create_user;
        const otp = generateOtp();

        await code_model.create({ user_id: _id, code: otp })
            .catch(async (err) => {
                // await user_model.deleteOne(_id)
                throw err.message
            });

        await email_send(email, username, otp)
            .catch(async (err) => {
                // await code_model.deleteOne({ user_id: _id });
                // await user_model.deleteOne(_id);
                throw err
            })

        const send_data = { ...create_user.toObject() };
        delete send_data.password;

        return res.status(200).json({
            message: "user created successfully",
            data: send_data,

        });

    } catch (error) {
        return res.status(500).json({
            message: "user creation Failed!",
            error: error,
        });
    }

};



const users_login = async (req, res) => {

    try {
        const body = req.body;

        const find_user = await user_model.findOne({ email: body.email });

        if (find_user === null) {
            return res.status(404).json({
                success: false,
                message: "user not found!",
            });
        };

        const compare_password = bcrypt.compareSync(body.password, find_user.password);


        if (compare_password === false) {
            return res.status(404).json({
                success: false,
                message: "password is incorrect!",
            });
        };


        const send_data = { ...find_user.toObject() };
        delete send_data.password;



        const jwt_payload = { id: find_user._id };

        const create_token = jwt.sign(
            jwt_payload,
            JWT_SECRET,
            { expiresIn: "7d" },
        );
        const expires_cookie = new Date(Date.now() + 60 * 60 * 24 * 30);

        res.cookie(COOKIE_AUTH_NAME, create_token,
            {
                expires: expires_cookie,
                httpOnly: true,
                // secure: true,
                sameSite: "none",
            }
        );
        return res.status(200).json({
            success: true,
            message: "user found successfully",
            data: send_data,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error!",
            error: error.message,
        });
    }

};

const verify_otp = async (req, res) => {
    try {
        const { code: otp, email } = req.body;
        const find_user = await user_model.findOne({ email });

        if (!find_user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        const otpFound = await code_model.findOne({ user_id: find_user._id });
        if (!otpFound) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
            });
        };
        const { code, typeWrongCode } = otpFound;

        if (code !== otp) {
            await otpFound.updateOne({ typeWrongCode: typeWrongCode + 1 });
            console.log(typeWrongCode)
            if (typeWrongCode >= 2) {
                // await otpFound.deleteOne();
                // await find_user.deleteOne();
                return res.status(400).json({
                    success: false,
                    message: "OTP is not valid. Please SignUp with correct credientials!",
                });
            };
            return res.status(400).json({
                success: false,
                message: `OTP is not correct! try One more time.`,
            });
        }


        if (code == otp) {
            await otpFound.deleteOne();
            await find_user.updateOne({ isVerified: true });

            return res.status(200).json({
                success: true,
                message: "SuccessFully Verified!",
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "OTP is not valid",
        });
    }

}

module.exports = { users_signUp, users_login, verify_otp }