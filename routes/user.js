const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//Login page
router.get("/login", (req, res) => res.render("login"));

//Register Page
router.get("/register", (req, res) => res.render("register"));

//Registration Handler
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];
  //Basic Validation
  //Check all fields are filled
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill all the required fields!" });
  }

  //Check password lenght
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be atleast 6 characters long" });
  }

  //check if passwords are matching
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match!" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      password,
      password2,
    });
  } else {
    //When validation is passed, then
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already registered!" });
        res.render("register", {
          errors,
          name,
          password,
          password2,
        });
      } else {
        //Create a new user by calling the User model
        //Hash password
        let hashedPass;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            hashedPass = hash;
          });
        });
        const newUser = new User({
          name,
          email,
          hashedPass,
        });
        newUser.save();
      }
    });
  }
});

module.exports = router;
