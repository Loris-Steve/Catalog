/* const ArticleModel = require('../models/Article.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const jwtUtils = require('../utils/jwt.utils');
const Role = require('../utils/ArticleRoles.utils'); */

/******************************************************************************
 *                              Article Controller
 ******************************************************************************/
 class ArticleController {

    createArticle = async (req, res, next) => {
        
    };
        
    getArticlesByName = async (req, res, next) => {
        console.log("Enter controller ARTICLE GET !!")

        res.send({ articles : ['a1','a2', 'a3']});
    };

    ArticleDetails = async (req, res, next) => {

    };
    
    updateArticle = async (req, res, next) => {
      
    };

    deleteArticle = async (req, res, next) => {
     
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
module.exports = new ArticleController;