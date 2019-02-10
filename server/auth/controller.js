const User = require('../api/user/userModel'),
    signToken = require('./auth').signToken;

exports.signIn = (req, res, next) => {
    // req.user will be there from the middleware
    // verify user. Then we can just create a token
    // and send it back for the client to consume

    const token = signToken(req.user.toJson());
    res.json({user: req.user.toJson(), token: token});
};
