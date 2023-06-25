const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.getAdminProfile = async (req, res) => {
  const admin = {
    _id: req.admin._id,
    username: req.admin.username,
    email: req.admin.email,
  };

  return res.status(200).json(admin);
};

exports.updateAdmin = async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    admin.username = req.body.username || admin.username;
    admin.email = req.body.email || admin.email;

    const updatedAdmin = await admin.save();
    return res.status(200).json({
      _id: updatedAdmin._id,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
    });
  } else {
    return res.status(404).json({
      msg: "User not found",
    });
  }
};

exports.updatePassword = async (req, res) => {
  const admin = await Admin.findById({ _id: req.admin._id });
  if (!admin) {
    return res.status(404).json({ msg: "User Not Found" });
  }
  if (
    !(await admin.correctPassword(req.body.current_password, admin.password))
  ) {
    return res.status(401).json({ msg: "wrong password" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
  admin.password = hashedPassword;
  try {
    await admin.save();
    return res.status(200).json({
      msg: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
