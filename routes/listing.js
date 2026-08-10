const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingsController = require("../controllers/listings.js");

//Index Route
router.get("/", wrapAsync(listingsController.index));

//New Route
router.get("/new", isLoggedIn, listingsController.newRoute);

//Show Route
router.get("/:id", wrapAsync(listingsController.show));

//Create Route
router.post("/", isLoggedIn, validateListing, wrapAsync(listingsController.create));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.edit));

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.update));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.destroy));

module.exports = router;