const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    auth = require('./auth/routes'),
    userRoutes = require('./api/user/userRoutes'),
    recipeRoutes = require('./api/recipe/recipeRoutes'),
    commentRoutes = require('./api/comment/commentRoutes');

// db.url is different depending on NODE_ENV
mongoose.connect(config.db.url, {
    useNewUrlParser: true
})
    .then(() => console.log(`Connected to ${config.db.url}`))
    .catch(err => console.log(err));

// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
// app.use('/api', api);
app.use('/auth', auth);
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', commentRoutes);

// set up global error handling
app.use((err, req, res, next) => {
    // if error thrown from jwt validation check
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({token: 'Invalid token'});
        return;
    }

    console.log(err.stack);
    res.status(500).send(err);
});

// export the app for testing
module.exports = app;
