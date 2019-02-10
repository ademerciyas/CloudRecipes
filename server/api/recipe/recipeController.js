const Recipe = require('./recipeModel'),
    _ = require('lodash'),
    validateRecipeInput = require('../../validation/createRecipe');

exports.params = (req, res, next, id) => {
    Recipe.findById(id)
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with the specified id'))
            } else {
                req.recipe = recipe;
                next()
            }
        }, err => next(err))
};

// @route   GET api/recipes
// @desc    Returns all Recipes
// @access  Public
exports.getRecipes = (req, res, next) => {
    Recipe.find({})
        .populate('Comment')
        .exec()
        .then(recipes => {
            res.json(recipes)
        }, err => next(err))
};

// @route   GET api/profiles/:recipeId
// @desc    Returns a single recipe
// @access  Public
exports.getRecipe = (req, res) => {
    const recipe = req.recipe;
    res.json(recipe)
};

// @route   Update api/profiles/:recipeId
// @desc    Updates a single recipe
// @access  Private
exports.updateRecipe = (req, res, next) => {
    const recipe = req.recipe;
    const update = req.body;
    _.merge(recipe, update);
    recipe.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

// @route   POST api/profiles/
// @desc    Creates a single recipe
// @access  private
exports.createRecipe = (req, res, next) => {
    const {errors, isValid} = validateRecipeInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    let newRecipe = new Recipe();
    if (req.body.flavors) {
        req.body.flavors.forEach(flavor => {
            newRecipe.flavors.push({
                company: flavor.company,
                name: flavor.name,
                percentage: flavor.percentage,
                vg: flavor.vg,
                pg: flavor.pg
            })
        });
    } else {
        return res.status(400).send({flavors: 'The recipe must contain at least one flavor'});
    }
    newRecipe.creator.username = req.user.username;
    newRecipe.creator.id = req.user._id;
    newRecipe.name = req.body.name;
    newRecipe.amount = req.body.amount;
    newRecipe.pg = req.body.pg;
    newRecipe.vg = req.body.vg;
    newRecipe.strength = req.body.strength;
    newRecipe.nicotineStrength = req.body.nicotineStrength;
    newRecipe.vgNicotine = req.body.vgNicotine;
    newRecipe.pgNicotine = req.body.pgNicotine;
    newRecipe.suggestedSteepTime = req.body.suggestedSteepTime;

    Recipe.create(newRecipe)
        .then(recipe => {
            res.json(recipe);
        }, err => {
            next(err);
        });
};

// @route   DELETE api/profiles/recipeId
// @desc    Deletes a single recipe
// @access  private
exports.deleteRecipe = (req, res, next) => {
    req.recipe.remove((err, removed) => {
        if (err) {
            next(err)
        } else {
            res.json(removed)
        }
    })
};