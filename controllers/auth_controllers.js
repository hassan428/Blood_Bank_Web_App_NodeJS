const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { email_send } = require("../services/nodemailer_service");
const { generateOtp } = require("../services/genereate_otp");
const user_model = require("../models_schema/user_profile");
const code_model = require("../models_schema/user_codes");

const { GENSALT, JWT_SECRET, COOKIE_AUTH_NAME } = process.env;

const signUp = async (req, res) => {
  try {
    const { user } = req;
    const { password, username, email } = user;
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Your password must be more than 8 characters" });
    }

    const genSalt = bcrypt.genSaltSync(+GENSALT);
    const hash = bcrypt.hashSync(password, genSalt);

    const create_user = await user_model.create({ ...user, password: hash });
    const { _id } = create_user;
    const otp = generateOtp();

    await code_model.create({ user_id: _id, code: otp }).catch(async (err) => {
      await user_model.deleteOne(_id);
      throw err.message;
    });

    await email_send(email, username, otp).catch(async (err) => {
      await code_model.deleteOne({ user_id: _id });
      await user_model.deleteOne(_id);
      throw err;
    });

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

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find_user = await user_model.findOne({ email });

    if (find_user === null) {
      return res.status(404).json({
        success: false,
        message: "user not found!",
      });
    }
    if (!find_user.isVerified) {
      return res.status(404).json({
        success: false,
        message:
          "Your email hasn't been verified yet. Please sign up and verify your email.",
      });
    }

    const compare_password = bcrypt.compareSync(password, find_user.password);

    if (compare_password === false) {
      return res.status(404).json({
        success: false,
        message: "password is incorrect!",
      });
    }

    const send_data = { ...find_user.toObject() };
    delete send_data.password;

    const jwt_payload = { id: find_user._id };

    const create_token = jwt.sign(jwt_payload, JWT_SECRET, { expiresIn: "7d" });
    const expires_cookie = new Date(Date.now() + 60 * 60 * 24 * 30);

    res.cookie(COOKIE_AUTH_NAME, create_token, {
      maxAge: expires_cookie,
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
    });
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

const logOut = async (req, res) => {
  try {
    res.cookie(COOKIE_AUTH_NAME, "empty", { maxAge: 5000 });
    return res.status(200).json({
      success: true,
      message: "Logout successful. Thank you for using our service!",
    });
  } catch (error) {}
  return res.status(500).json({
    success: false,
    message: "Sever Error",
  });
};

const verify_otp = async (req, res) => {
  try {
    const { otp, code, find_user, otpFound } = req.user;
    if (code == otp) {
      await otpFound.deleteOne();
      await find_user.updateOne({ isVerified: true });

      const jwt_payload = { id: find_user._id };
      const create_token = jwt.sign(jwt_payload, JWT_SECRET, {
        expiresIn: "7d",
      });

      const expires_cookie = new Date(Date.now() + 60 * 60 * 24 * 30);

      res.cookie(COOKIE_AUTH_NAME, create_token, {
        maxAge: expires_cookie,
        // httpOnly: true,
        // secure: true,
        // sameSite: "none",
      });

      return res.status(200).json({
        success: true,
        message: "SuccessFully Verified!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error!",
      error,
    });
  }
};

const forget_password = async (req, res) => {
  const { otp, code, find_user, otpFound } = req.user;

  try {
    if (code == otp) {
      await otpFound.deleteOne();
      return res.status(200).json({
        success: true,
        message: "SuccessFully Verified!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error!",
      error,
    });
  }
};

module.exports = { logOut, forget_password, signUp, logIn, verify_otp };
