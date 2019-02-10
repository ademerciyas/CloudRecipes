const router = require('express').Router(),
    controller = require('./recipeController'),
    auth = require('../../auth/auth'),
    checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('recipeId', controller.params);

router.route('/recipes')
    .get(controller.getRecipes)
    .post(checkUser, controller.createRecipe);

router.route('/recipes/:recipeId')
    .get(controller.getRecipe)
    .put(checkUser, controller.updateRecipe)
    .delete(checkUser, controller.deleteRecipe);

module.exports = router;

