const jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    config = require('../config/config'),
    checkToken = expressJwt({secret: config.secrets.jwt}),
    validateLoginInput = require('../validation/login'),
    User = require('../api/user/userModel');

exports.decodeToken = () => {
    return (req, res, next) => {
        // make it optional to place token on query string
        // if it is, place it on the headers where it should be
        // so checkToken can see it. See follow the 'Bearer 034930493' format
        // so checkToken can see it and decode it
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }

        // this will call next if token is valid
        // and send error if its not. It will attached
        // the decoded token to req.user
        checkToken(req, res, next);
    };
};

exports.getFreshUser = () => {
    return (req, res, next) => {
        User.findById(req.user.id)
            .then(user => {
                console.log(user);
                if (!user) {
                    // if no user is found it was not
                    // it was a valid JWT but didn't decode
                    // to a real user in our DB. Either the user was deleted
                    // since the client got the JWT, or
                    // it was a JWT from some other source
                    res.status(401).send('Unauthorized');
                } else {
                    // update req.user with fresh user from
                    // stale token data
                    req.user = user;
                    next();
                }
            }, err => {
                next(err);
            });
    }
};

exports.verifyUser = () => {
    return (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;

        // if no username or password then send
        const {errors, isValid} = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // look user up in the DB so we can check
        // if the passwords match for the username
        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    res.status(401).send({email: 'No user with the given email'});
                } else {
                    // checking the passowords here
                    if (!user.authenticate(password)) {
                        res.status(401).send({password: 'Wrong password'});
                    } else {
                        // if everything is good,
                        // then attach to req.user
                        // and call next so the controller
                        // can sign a token from the req.user._id
                        req.user = user;
                        next();
                    }
                }
            }, err => {
                next(err);
            });
    };
};

// util method to sign tokens on signup
exports.signToken = user => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        password: user.password
    };
    return jwt.sign(
        payload,
        config.secrets.jwt,
        {expiresIn: config.expireTime}
    );
};
