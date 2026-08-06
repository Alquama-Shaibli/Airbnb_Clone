const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");




router.get("/sign-up", (req, res) => {
  res.render("user/signup.ejs");
});


router.post("/sign-up", wrapAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

req.flash("success", "Welcome to Airbnb Clone!");
    res.redirect("/listings");
  }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/sign-up");
    });


router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), 

async (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/listings");
});

module.exports = router;
 