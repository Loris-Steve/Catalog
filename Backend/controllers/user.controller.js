const UserModel = require('../models/user.model');
/* 
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');
const Role = require('../utils/userRoles.utils'); */

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {

    createUser = async (req, res, next) => {
        // const result = await UserModel.create(req.body);
        // if (result.error) {
        //      res.status(500).send({ message: 'Une erreur est survenue' });
        //  }
        //  else{
        //      res.send(result);
        //  }

         this.checkValidation(req);
        
         const user = await UserModel.findOne({ email : req.body.email });
         
         if (user) {
             throw new HttpException(400, 'Email déjà existant');
         }
 
         await this.hashPassword(req);
 
         const result = await UserModel.create(req.body);
         
         if (result.error) {
            // throw new HttpException(500, "Une erreur est survenue : "+result.error);
             res.status(500).send({ message: 'Une erreur est survenue' });
         }
         else{
             
             const user =  req.body ;
             user.idUser = result.idUser;
             
             const token = jwtUtils.getToken(user);
             
             const { confirm_password ,  password, ...userWithoutPassword } = user;
             
             //res.status(201).send('you must confirm your email');
             res.send({ ...userWithoutPassword, token });
             
         }
    };
        

    userDetails = async (req, res, next) => {

    };

    userLogin = async (req, res, next) => {
        const result = await UserModel.find(req.body);
        if (result.error) {
             res.status(500).send({ message: 'Une erreur est survenue' });
         }
         else{
             res.send(result);
         }
    };
    
    updateUser = async (req, res, next) => {
      
    };

    deleteUser = async (req, res, next) => {
     
    };

    // ---------  FUNCTIONS ---------

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

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