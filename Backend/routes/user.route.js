const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// const { authUser , authKey } = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.post('/',  createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/users

router.post('/signin', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/users/login

router.get('/:id', awaitHandlerFactory(userController.userDetails)); // localhost:3000/api/users/login

router.patch('/:id', awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/users/1 , using patch for partial update

router.delete('/:id', awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/users/1

module.exports = router;