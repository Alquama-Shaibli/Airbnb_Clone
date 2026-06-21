const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/AirBnb_Db';

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

const initializeDb = async () => {
  await Listing.deleteMany({});
  console.log('Cleared existing listings');
  await Listing.insertMany(initdata.data);
  console.log('Initialized database with sample listings');
};

main().then(initializeDb);