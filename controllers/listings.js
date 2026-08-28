const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const maptoken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.newRoute = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res) => {
   let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send()


  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;
  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

let originalImageUrl = listing.image.url; // Store the original image URL
originalImageUrl = originalImageUrl.replace("/upload/", "/upload/h_300,w_250/"); // Replace the path to match the new image path
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    listing.image = { url: req.file.path, filename: req.file.filename };
    await listing.save();
  }
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};

