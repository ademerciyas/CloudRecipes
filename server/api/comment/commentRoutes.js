const router = require('express').Router(),
    controller = require('./commentController'),
    auth = require('../../auth/auth'),
    checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('commentId', controller.params);

router.route('/recipes/:recipeId/comments')
    .get(controller.getComments)
    .post(checkUser, controller.createComment);

router.route('/recipes/:recipeId/comments/:commentId')
    .get(controller.getComment)
    .put(checkUser, controller.updateComment)
    .delete(checkUser, controller.deleteComment);

module.exports = router;