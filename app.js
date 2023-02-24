const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const dbConnect = require("./config/dbConnect");

dbConnect();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body parser
app.use(express.urlencoded({ extended: false }));
//Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server has started..."));
