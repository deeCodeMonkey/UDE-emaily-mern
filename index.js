const express = require('express');
const mongoose = require('mongoose');

//for express to use cookies with passport
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

require('./models/User');
//helper module 
require('./services/passport');

//connect to external mongo db provider
mongoose.connect(keys.mongoURI);

const app = express();


app.use(
    cookieSession({
        //30 days in milliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//to use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
