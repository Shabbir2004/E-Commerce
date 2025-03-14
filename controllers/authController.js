const userModel = require("../models/usermodel.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.js");

module.exports.registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("All fields (fullname, email, password) are required");
      return res.redirect("/");
    }

    let user = await userModel.findOne({ email: email });

    if (user) {
      req.flash("error", "You already have an account");
      return res.redirect("/");
    }

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/");
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User registered successfully!");
          res.redirect("/shop");
        }
      });
    });
  } catch (err) {
    req.flash("error", "An error occurred, please try again.");
    res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    req.flash("error", "Register first before logging in");
    return res.redirect("/");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("success", "Login successful!");
      res.redirect("/shop");
    } else {
      req.flash("error", "Invalid email or password");
      res.redirect("/");
    }
  });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token", "");
  res.redirect("/");
};
