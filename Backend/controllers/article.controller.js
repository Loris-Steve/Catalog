const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');
const Role = require('../utils/userRoles.utils');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

    createUser = async (req, res, next) => {
        
    };
        

    userDetails = async (req, res, next) => {

    };

    userLogin = async (req, res, next) => {
     
    };
    
    updateUser = async (req, res, next) => {
      
    };

    deleteUser = async (req, res, next) => {
     
    };

// ----------- ADMIN FUNCTIONS ------------


    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;