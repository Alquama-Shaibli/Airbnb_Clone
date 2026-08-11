const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const usersController = require("../controllers/users.js");

// Signup GET
router.get("/sign-up", usersController.renderSignupForm);

// Signup POST
router.post("/sign-up", wrapAsync(usersController.signup));

// Login GET
router.get("/login", usersController.renderLoginForm);

// Login POST
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  wrapAsync(usersController.login)
);

// Logout
router.get("/logout", usersController.logout);

module.exports = router;
