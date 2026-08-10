const Listing = require("./models/listing");
const review = require("./models/review.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      // rediret to login page and save the original URL to redirect back after login
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to access this page!");
        return res.redirect("/login");
    }
    next();
  }};

  module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
  }


  module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currentUser._id)){ 
    req.flash("error", "You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}


module.exports.validateListing = (req, res, next) => {
   let { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errorMessage, 400);
  }else{
  next();
}
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewDoc = await review.findById(reviewId);
  if(!reviewDoc.author.equals(res.locals.currentUser._id)){ 
    req.flash("error", "You are not the author!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}