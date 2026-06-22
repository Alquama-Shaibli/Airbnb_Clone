// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

// MongoDB connection URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/AirBnb_Db';

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
main();

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listings index route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    // no leading slash, no .ejs
    res.render('listings/index', { allListings });
 });


 // New Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});

// Show Route
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show', { listing });
});

// create route
app.post('/listings', async (req, res) => {
    let newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect('/listings');
});
// Start server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});