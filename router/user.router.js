const router = require('express').Router();
const userMiddleware = require('../middleware/user.middleware');

const userController = require('../controller/user.controller');

router
    .get('/', userController.getUsers)
    .post('/', userMiddleware.isUserWithThisEmail, userMiddleware.isUserValid, userController.createUser)
    .put('/', userMiddleware.isUserRegister, userMiddleware.isUserValid, userController.updateUser)
    .delete('/', userController.deleteUser);

module.exports = router;
