const router = require('express').Router(),
    verifyUser = require('./auth').verifyUser,
    controller = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signIn);

module.exports = router;
