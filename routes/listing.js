const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const uploadCloud = multer({ storage });

router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, uploadCloud.single("listing[image]"), validateListing, wrapAsync(listingsController.create));



router.get("/new", isLoggedIn, listingsController.newRoute);

router.route("/:id")
    .get(wrapAsync(listingsController.show))
    .put(isLoggedIn, isOwner, uploadCloud.single("listing[image]"), validateListing, wrapAsync(listingsController.update))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroy));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.edit));

module.exports = router;