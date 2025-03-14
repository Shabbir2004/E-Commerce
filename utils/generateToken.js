const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};


