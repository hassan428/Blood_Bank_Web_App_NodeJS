const code_model = require("../models_schema/user_codes");
const user_model = require("../models_schema/user_profile");
const { generateOtp } = require("../services/genereate_otp");
const { email_send } = require("../services/nodemailer_service");

const send_otp_forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    const find_user = await user_model.findOne({ email });
    if (!find_user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { _id, username } = find_user;
    const previuos_otp = await code_model.findOne({ user_id: _id });

    if (previuos_otp) {
      await previuos_otp.deleteOne();
    }

    const otp = generateOtp();
    await code_model.create({ user_id: _id, code: otp });
    await email_send(email, username, otp).catch(async (err) => {
      await code_model.deleteOne({ user_id: _id });
      throw err;
    });
    return res
      .status(200)
      .json({ success: true, message: "The OTP has been sent to you." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "serve error" });
  }
};

module.exports = { send_otp_forget_password };
