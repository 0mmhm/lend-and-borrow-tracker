const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log('could not conenct to MongoDB');
    console.log('successfully connected to MongoDB server');
});

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
