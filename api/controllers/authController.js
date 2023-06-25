const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ms = require("ms");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.correctPassword(password, admin.password))) {
    return res.status(400).json({ msg: "Incorrect Password or Email" });
  }

  const token = jwt.sign({ admin_Id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    maxAge: ms(process.env.JWT_EXPIRES_IN),
    httpOnly: true,
  });

  return res.status(200).json({
    status: "success",
    token,
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let existedAdmin = await Admin.findOne({ email });
  if (existedAdmin) {
    return res.status(401).json({ msg: "User already exists" });
  }

  const newAdmin = new Admin({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentAdmin = await Admin.findById(decoded.admin_Id).select(
      "-password"
    );
    if (!currentAdmin)
      return res.status(401).json({
        error: "the user belonging to this token does no longer exist",
      });
    req.admin = currentAdmin;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Invalid Token" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    msg: "Log out !!",
  });
};
