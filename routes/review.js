const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middlewares.js");



const validateReview = (req, res, next) => {
   let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errorMessage, 400);
  }else{
  next();
}
}; 



//Create Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  listing.reviews.push(newreview);
  newreview.author = req.user._id; // Assign the logged-in user as the author of the review
  await newreview.save();
  await listing.save();
  req.flash("success", "New review added successfully!");
  res.redirect(`/listings/${listing._id}`);
}));


//Delete Review Route
router.delete("/:reviewId", isLoggedIn, wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}));

module.exports = router;
