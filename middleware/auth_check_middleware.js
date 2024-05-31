const jwt = require("jsonwebtoken");
const user_model = require("../models_schema/user_profile");
const { COOKIE_AUTH_NAME, JWT_SECRET } = process.env;

const auth_check = async (req, res, next) => {
  try {
    const { cookies } = req;
    const token = cookies[COOKIE_AUTH_NAME];

    if (!token)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const verify_token = jwt.verify(token, JWT_SECRET);

    const find_user = await user_model
      .findById(verify_token.id)
      .select("-password");

    if (!find_user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const find_other_user = await user_model
      .find({
        bloodGroup: find_user.bloodGroup,
        _id: { $ne: find_user._id },
        isVerified: true,
      })
      .select("-password");

    // console.log(find_other_user);

    req.user = find_user;
    req.other_user = find_other_user;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    return res.status(500).json({
      message: "Server error!",
    });
  }
};

module.exports = auth_check;
