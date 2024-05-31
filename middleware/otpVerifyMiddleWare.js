const code_model = require("../models_schema/user_codes");
const user_model = require("../models_schema/user_profile");

const otpVerifyMiddleWare = async (req, res, next) => {
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
        message: "OTP is not valid!",
      });
    }
    const { code, typeWrongCode } = otpFound;

    if (code !== otp) {
      await otpFound.updateOne({ typeWrongCode: typeWrongCode + 1 });
      console.log(typeWrongCode);
      if (typeWrongCode >= 2) {
        return res.status(400).json({
          success: false,
          message: "OTP is not valid. Please SignUp with correct credientials!",
        });
      }
      return res.status(400).json({
        success: false,
        message: `OTP is not correct! try One more time.`,
      });
    }
    req.user = { otp, code, find_user, otpFound };
    next();
  } catch (error) {
    return res.status(500).json({
      error,
      message: "server error",
    });
  }
};
module.exports = { otpVerifyMiddleWare };
