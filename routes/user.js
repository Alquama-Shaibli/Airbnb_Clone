const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require("../models/user.js");



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

module.exports = router;
 