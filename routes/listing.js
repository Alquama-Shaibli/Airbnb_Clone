const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingsController = require("../controllers/listings.js");


router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingsController.create));



router.get("/new", isLoggedIn, listingsController.newRoute);

router.route("/:id")
    .get(wrapAsync(listingsController.show))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.update))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroy));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.edit));

module.exports = router;