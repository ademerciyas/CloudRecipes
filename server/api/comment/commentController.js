const Comment = require('./commentModel'),
    Recipe = require('../recipe/recipeModel'),
    _ = require('lodash');

exports.params = (req, res, next) => {
    Recipe.findById(req.params.recipeId)
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with the specified id'))
            } else {
                recipe.comments.filter(comment => {
                    req.comment = comment;
                });
                next()
            }
        }, err => next(err))
};

// @route   GET api/recipes/:recipeId/comments
// @desc    Returns all comments for a specific recipe
// @access  Public
exports.getComments = (req, res, next) => {
    Recipe.findById({_id: req.params.recipeId})
        .populate('Comments.creator')
        .exec()
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with the specified id'))
            } else {
                res.json(recipe.comments);
            }
        }, err => next(err))
};

// @route   GET api/recipes/:recipeId/comments/:commentId
// @desc    Returns a single comment for a specific recipe
// @access  Public
exports.getComment = (req, res) => {
    const comment = req.comment;
    res.json(comment)
};

// @route   PUT api/recipes/:recipeId/comments/:commentId
// @desc    Updates a single comment for a specific recipe
// @access  Private
exports.updateComment = (req, res, next) => {
    const comment = req.comment;
    const update = req.body;
    _.merge(comment, update);
    Recipe.findById(req.params.recipeId)
        .then(recipe => {
            recipe.comments.id(req.params.commentId).text = update.text;
            recipe.save((err, saved) => {
                if (err) next(err);
                else {
                    res.json(saved.comments.id(req.params.commentId))
                }
            })
        })
};

// @route   POST api/recipes/:recipeId/comments
// @desc    Creates a comment for a specific recipe
// @access  Public
exports.createComment = (req, res, next) => {
    Recipe.findById(req.params.recipeId)
        .select('comments')
        .exec()
        .then(recipe => {
            if (!recipe) {
                next(new Error('No recipe with the specified id'))
            } else {
                let newComment = new Comment();
                newComment.creator.username = req.user.username;
                newComment.creator.id = req.user._id;
                newComment.text = req.body.text;
                recipe.comments.push(newComment);
                recipe.save((err, updatedRecipe) => {
                    if (err) {
                        next(err);
                    } else {
                        if (updatedRecipe.comments.length === 1) {
                            res.json(updatedRecipe.comments[0]);
                        } else {
                            res.json(updatedRecipe.comments[updatedRecipe.comments.length - 1]);
                        }
                    }
                })
            }
        }, err => next(err))
};

// @route   DELETE api/recipes/:recipeId/comments/:commentId
// @desc    Deletes a comment for a specific recipe
// @access  Private
exports.deleteComment = (req, res, next) => {
    Recipe.findById(req.params.recipeId)
        .then(recipe => {
            recipe.comments.id(req.params.commentId).remove();
            recipe.save((err, saved) => {
                if (err) next(err);
                else {
                    res.json(saved)
                }
            })
        })
};