/* const CustomArticleModel = require('../models/CustomArticle.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');
const Role = require('../utils/CustomArticleRoles.utils'); */

/******************************************************************************
 *                              CustomArticle Controller
 ******************************************************************************/
 class CustomArticleController {

    createCustomArticle = async (req, res, next) => {
        
    };
        

    CustomArticleDetails = async (req, res, next) => {

    };
    
    updateCustomArticle = async (req, res, next) => {
      
    };

    deleteCustomArticle = async (req, res, next) => {
     
    };


//     // hash password if it exists
//     hashPassword = async (req) => {
//         if (req.body.password) {
//             req.body.password = await bcrypt.hash(req.body.password, 8);
//         }
//     }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CustomArticleController;