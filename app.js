const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/AirBnbDB';
main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }   }
    


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {  
    console.log(`Server is running on port 8080`);
});
 