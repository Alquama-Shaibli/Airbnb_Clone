require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');

const MONGODB_URI = process.env.ATLAS;

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

const initializeDb = async () => {
  try {
    // Clear existing data
    await Listing.deleteMany({});
    await User.deleteMany({ username: 'demoOwner' }); // clean up previous seed user

    // Create a dummy owner user
    const demoUser = new User({
      email: 'demo@airbnb.com',
      username: 'demoOwner',
    });
    // Register sets hashed password via passport-local-mongoose
    await User.register(demoUser, 'demoPassword123');
    console.log('Created demo owner user:', demoUser._id);

    // Attach the owner ObjectId to every listing
    const listingsWithOwner = initdata.data.map((obj) => ({
      ...obj,
      owner: demoUser._id,
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log('Initialized database with sample listings');
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

main().then(initializeDb);