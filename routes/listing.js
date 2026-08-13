const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingsController = require("../controllers/listings.js");
const Listing = require("../models/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Configure multer to store uploaded files in the "uploads" directory

router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingsController.create));
    .post( upload.single('Listing[image]'),(req, res) => {
        // Access the uploaded file through req.file
        console.log(req.file);
        res.send('File uploaded successfully!');
    });



router.get("/new", isLoggedIn, listingsController.newRoute);

router.route("/:id")
    .get(wrapAsync(listingsController.show))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingsController.update))
    .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroy));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.edit));

module.exports = router;