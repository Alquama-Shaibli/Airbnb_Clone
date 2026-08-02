const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");



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

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});



 app.use("/listings", listingRoutes);
 app.use("/listings/:id/reviews", reviewRoutes);

 


// for all routes if we go to a route that does not exist, we will get a 404 error. We can handle this by creating a custom error class and using it in our app.
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    let{ statusCode=500, message = "Something went wrong!"} = err;
    res.status(statusCode).render("listings/error.ejs", { message });
    
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

 