const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const usersController = require("../controllers/users.js");



router.route("/sign-up")
    .get(usersController.renderSignupForm)
    .post(wrapAsync(usersController.signup));

router.route("/login")
    .get(usersController.renderLoginForm)
    .post(
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
