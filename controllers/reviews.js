const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReview = (async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  listing.reviews.push(newreview);
  newreview.author = req.user._id; // Assign the logged-in user as the author of the review
  await newreview.save();

  await listing.save();
  req.flash("success", "New review added successfully!");
  res.redirect(`/listings/${listing._id}`);
});

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
}
