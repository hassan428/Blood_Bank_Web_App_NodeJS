const send_data = async (req, res) => {
  const { user, other_user } = req;
  return res
    .status(200)
    .json({ message: "User Found", data: { user, other_user } });
};

module.exports = { send_data };
