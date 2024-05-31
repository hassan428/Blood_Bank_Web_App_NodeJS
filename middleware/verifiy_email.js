const code_model = require("../models_schema/user_codes");
const user_model = require("../models_schema/user_profile");

const non_verify_email = async (req, res, next) => {
  try {
    const { email } = req.body;

    const find_email = await user_model.findOne({ email });
    if (!find_email) {
      req.user = req.body;
      next();
    } else if (!find_email.isVerified) {
      find_email.deleteOne().then(() => {
        code_model.deleteOne({ user_id: find_email._id }).then(() => {
          req.user = req.body;
          next();
        });
      });
    } else {
      req.user = req.body;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { non_verify_email };
