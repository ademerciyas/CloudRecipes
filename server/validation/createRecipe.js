const Validator = require('validator'),
    isEmpty = require('./is-empty');

module.exports = function validateRecipeInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.amount = !isEmpty(data.amount) ? data.amount : '';
    data.pg = !isEmpty(data.pg) ? data.pg : '';
    data.vg = !isEmpty(data.vg) ? data.vg : '';
    data.flavors = !isEmpty(data.flavors) ? data.flavors: '';

    if (!Validator.isLength(data.name, {min: 2, max: 20})) {
        errors.name = 'Name must be between 2 and 20 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (!Validator.isInt(data.amount.toString(), {min: 10})) {
        errors.amount = 'Amount must be at least 10 ml';
    }

    if (!Validator.isInt(data.pg.toString(), {min: 10, max: 100})) {
        errors.pg = 'Pg must be between 10 and 100 ml';
    }

    if (!Validator.isInt(data.vg.toString(), {min: 10, max: 100})) {
        errors.vg = 'Pg must be between 10 and 100 ml';
    }

    if (Validator.isEmpty(data.flavors[0] + '')) {
        errors.flavors = "The recipe must at least have a single flavor";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

};