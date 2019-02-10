const User = require('./userModel'),
    _ = require('lodash'),
    validateRegisterInput = require('../../validation/register'),
    validateUpdateUserInput = require('../../validation/updateUser'),
    signToken = require('../../auth/auth').signToken;

exports.params = (req, res, next, id) => {
    User.findById(id)
        .select('-password')
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({_id: 'No user with the specified id '})
            } else {
                req.user = user;
                next();
            }
        }, err => {
            next(err);
        });
};

// @route   GET api/users
// @desc    Returns all users
// @access  Public
exports.getUsers = (req, res, next) => {
    User.find({})
        .select('-password')
        .exec()
        .then(users => {
            res.json(users.map(user => {
                return user.toJson();
            }));
        }, err => {
            next(err);
        });
};

// @route   GET api/users/:userId
// @desc    Returns a single user
// @access  Public
exports.getUser = (req, res) => {
    const user = req.user.toJson();
    res.json(user);
};

// @route   PUT api/users/:userId
// @desc    Updates currently logged in user
// @access  Private
exports.updateUser = (req, res, next) => {
    const user = req.user;
    const update = req.body;
    user.updated = Date.now();

    _.merge(user, update);

    const {errors, isValid} = validateUpdateUserInput(user);
    if (!isValid) {
        return res.status(400).json(errors)
    }

    user.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved.toJson());
        }
    })
};

// @route   POST api/users
// @desc    Creates a new user
// @access  Public
exports.createUser = (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newUser = new User(req.body);

    User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
        .then(user => {
            if (user) {
                if (user.email === req.body.email) return res.status(400).send({email: 'Email already exists'});
                if (user.username === req.body.username) return res.status(400).send({username: 'Username already exists'});
            } else {
                newUser.save((err, user) => {
                    if (err) {
                        return res.json(err);
                    }
                    const token = signToken(user._id);
                    res.json({user: user.toJson(), token: token});
                });
            }
        });

};

// @route   DELETE api/users/:userId
// @desc    Deletes currently logged in user
// @access  Private
exports.deleteUser = (req, res, next) => {
    req.user.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed.toJson());
        }
    });
};

exports.me = (req, res) => {
    res.json(req.user.toJson());
};