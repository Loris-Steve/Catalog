const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');
const {checkValidation} = require('../middleware/checkValidation')

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

         checkValidation(req);
        
         const user = await UserModel.findOne({ email : req.body.email });
         
         if (user) {
             throw new HttpException(400, 'email already exist');
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
             
             const { password, ...userWithoutPassword } = user;
             
             res.send({ ...userWithoutPassword, token });
             
         }
    };
        

    userDetails = async (req, res, next) => {

    };

    userLogin = async (req, res, next) => {
        // const result = await UserModel.find(req.body);
        // if (result.error) {
        //      res.status(500).send({ message: 'Une erreur est survenue' });
        //  }
        //  else{
        //      res.send(result);
        //  }
        checkValidation(req);
        const { email, password: pass } = req.body;
        
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            throw new HttpException(401, 'unknow');
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        
        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }
        
        console.log(" first ! " + email+ " password : "+ pass+ " idUser : "+user.idUser)
        const token = jwtUtils.getToken(user);
        
        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };
    
    updateUser = async (req, res, next) => {
      
    };

    deleteUser = async (req, res, next) => {
     
    };

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }

    constructorUser = (newUser) => {
        return {
            idUser: newUser.idUser,
            photo: newUser.photo,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role : newUser.role
        };
    }
    
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;