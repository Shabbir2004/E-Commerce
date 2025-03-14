const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const db = require("./config/mongooseConnection.js");
const ownersRouter = require("./routes/ownersRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const index = require("./routes/index.js")
const session = require("express-session");
const flash = require("connect-flash");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/",index)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
