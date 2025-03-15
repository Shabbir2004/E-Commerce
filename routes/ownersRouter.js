const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Owner is working");
});

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts",{success});
});

module.exports = router;
