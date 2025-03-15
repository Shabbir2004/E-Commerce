const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("try");
});

module.exports = router;
