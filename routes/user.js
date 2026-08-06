const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");


// Signup GET
router.get("/sign-up", (req, res) => {
  res.render("UserSignup/signup.ejs");
});

// Signup POST
router.post("/sign-up", wrapAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.flash("success", "Welcome to Airbnb Clone!");
    res.redirect("/listings");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/sign-up");
  }
}));

// Login GET
router.get("/login", (req, res) => {
  res.render("UserSignup/login.ejs");
});

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  }
);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
});

module.exports = router;