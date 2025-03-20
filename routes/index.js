const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const productModel = require("../models/productmodel.js");
const usermodel = require("../models/usermodel.js");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("succes");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await usermodel
    .findOne({ email: req.user.email })
    .populate("cart");

     const bill = (Number(user.cart[0].price)+50)-Number(user.cart[0].discount)

  res.render("cart", { user , bill});
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  let user = await usermodel.findOne({ email: req.user.email });
  

  user.cart.push(req.params.id);
  await user.save();
  req.flash("Success", "Added to cart");
  res.redirect("/shop");
});

module.exports = router;
