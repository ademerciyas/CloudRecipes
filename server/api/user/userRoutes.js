const router = require('express').Router(),
    controller = require('./userController'),
    auth = require('../../auth/auth'),
    checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('userId', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/users')
  .get(controller.getUsers)
  .post(controller.createUser);

router.route('/users/:userId')
  .get(controller.getUser)
  .put(checkUser, controller.updateUser)
  .delete(checkUser, controller.deleteUser);

module.exports = router;
