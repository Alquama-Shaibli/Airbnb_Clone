const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRoutes = require("./routes/user.js");


const reviewRoutes = require("./routes/review.js");


const listingRoutes = require("./routes/listing.js");


// MongoDB connection URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/AirBnb_Db';

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGODB_URI);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));

// session configuration
const sessionOptions = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};

app.use(session(sessionOptions));

// flash configuration
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});


app.get("/demouser", async (req, res) => {
  let fakeUser = new User({ email: "student@gmail.com", username: "student" });
  let registeredUser = await User.register(fakeUser, "student");
  res.send(registeredUser);
}
);

 app.use("/listings", listingRoutes);
 app.use("/listings/:id/reviews", reviewRoutes);

 


// for all routes if we go to a route that does not exist, we will get a 404 error. We can handle this by creating a custom error class and using it in our app.
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    let{ statusCode=500, message = "Something went wrong!"} = err;
    console.error(`[Error ${statusCode}]: ${message}`);
    res.status(statusCode).render("listings/error.ejs", { message });
    
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

 