const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const { authUser , authKey } = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.post('/register',  createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/users

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/users/login

router.get('/:userId', awaitHandlerFactory(userController.userDetails)); // localhost:3000/api/users/login

router.patch('/:userId', awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/users/1 , using patch for partial update

router.delete('/:userId', awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/users/1

module.exports = router;