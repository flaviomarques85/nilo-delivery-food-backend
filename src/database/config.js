const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:67kBxT2qunq8@dev-aws-nodejs.r7l6s.mongodb.net/?retryWrites=true&w=majority&appName=dev-aws-nodejs/nodejs');
        console.log('MongoDB Connected!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };