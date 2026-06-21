const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: String, default : "https://unsplash.com/photos/modern-white-house-with-large-windows-overlooking-the-ocean-rXq2vzsuLRg", set: (v) => v === '' ? "https://unsplash.com/photos/modern-white-house-with-large-windows-overlooking-the-ocean-rXq2vzsuLRg" : v },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    country: { type: String, required: true },
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;