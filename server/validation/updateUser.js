const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function validateUpdateUserInput (data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email: '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password: '';

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid"
    }

    if (!Validator.isLength(data.username, {min: 2, max: 30})) {
        errors.username = 'Username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required"
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
