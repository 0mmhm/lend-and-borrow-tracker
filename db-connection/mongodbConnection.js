const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log('could not conenct to MongoDB');
    else console.log('successfully connected to MongoDB server');
});