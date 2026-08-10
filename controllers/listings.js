const Listing = require("../models/listing");

// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New Route
module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Route
module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

// Create Route
module.exports.create = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; // Assign the logged-in user as the owner of the listing
  await newListing.save();
  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

// Edit Route
module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

// Update Route
module.exports.update = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

// Delete Route
module.exports.destroy = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  console.log(deletedListing);
  res.redirect("/listings");
};