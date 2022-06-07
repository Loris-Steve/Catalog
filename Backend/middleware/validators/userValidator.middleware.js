const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles');


exports.createUserSchema = [
    check('firstName')
        .exists()
        .withMessage('Your first name is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('lastName')
        .exists()
        .withMessage('Your last name is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 3 chars long'),
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email'),
    check('role')
        .optional()
        .isIn([Role.User, Role.Professional])
        .withMessage('Invalid Role type'),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
];

exports.validateLogin = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        ,
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.userOwner = [
    check('id_User')
        .exists()
        .withMessage('id_User is required')
        .custom((value, { req }) => {
            if(req.currentUser.role != Role.Admin){
                return value === req.currentUser.idUser;
            }
        })
        .withMessage('idUser field must have the same value as the idUser  field ')
]