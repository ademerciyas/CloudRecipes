const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function validateLoginInput (data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';


    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "password field is required"
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
