const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://shabbirabbas2004:Shabbir12345@cluster0.hjh3w.mongodb.net/eCommerce`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })

  .catch((err) => {
    console.log("Error to connecting MongoDB", err);
  });

module.exports = mongoose.connection;
