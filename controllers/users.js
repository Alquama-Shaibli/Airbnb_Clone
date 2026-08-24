const User = require("../models/user.js");

// Signup GET
module.exports.renderSignupForm = (req, res) => {
  res.render("UserSignup/signup.ejs");
};

// Signup POST
module.exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log("Registered User:", registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Airbnb Clone!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/sign-up");
  }
};

// Login GET
module.exports.renderLoginForm = (req, res) => {
  res.render("UserSignup/login.ejs");
};

// Login POST
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
