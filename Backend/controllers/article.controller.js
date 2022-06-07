const ArticleModel = require('../models/Article.model');
const HttpException = require('../utils/HttpException.utils');
const {checkValidation} = require('../middleware/checkValidation')
const dotenv = require('dotenv');
dotenv.config();
const { matchedData } = require('express-validator');
const CatalogController = require('./catalog.controller');

module.exports = NUMBER_ARTICLE_PAGE = 10;
/******************************************************************************
 *                              Article Controller
 ******************************************************************************/
 
class ArticleController {

    createArticle = async (req, res, next) => {
        const matched = matchedData(req, {
            includeOptionals: true,
        });
        checkValidation(req);

        const result = await ArticleModel.add(matched);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send({ message : 'Article was created!', idArticle : result.idArticle });

    };
    
    formatArticleParams(params = {},matched){
        
        params.idArticle = matched.idArticle && matched.idArticle ;

        params.id_SubCategory = matched.id_SubCategory && matched.id_SubCategory ;

        params.titleArticle = matched.titleArticle && matched.titleArticle ;

        params.descriptionArticle = matched.descriptionArticle && matched.descriptionArticle ;

        params.priceMin = matched.priceMin && matched.priceMin ;
        params.priceMax = matched.priceMax && matched.priceMax ;

        return params;
    }
    


    getArticlesByParams = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });
        checkValidation(req);

        let params = {} ;

        params = this.formatArticleParams(params,matched);
        params = this.formatArticleParams(params,matched);

        let ArticleList = await ArticleModel.find(params);

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };


    // return article & catalog information
    getArticlesCatalogByParams = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });
        checkValidation(req);

        let params = {} ;

        params = this.formatArticleParams(params,matched);
        params = this.formatEndFilter(params,matched);
        params = CatalogController.formatCatalogParams(params,matched);

        console.log(params);
        let ArticleList = await ArticleModel.findByCatalog(params);

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    getArticlesDetails = async (req, res, next) => {

        // const matched = matchedData(req, {
        //     includeOptionals: true,
        // });
        // checkValidation(req);
        
        let ArticleList = 
        await ArticleModel.findArticleByIdCatalog(
            req.params.id_Catalog,
            req.params.id_Article);
            
            console.log("params ", req.params)
        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    // get article name by titleArticle to autocomplete
    getArticlesTitle = async (req, res, next) => {
        console.log("Enter controller ARTICLE GET !!",req.query)
        // res.send({ articles : ['a1','a2', 'a3']});
        const MAX_NAME = 10;
        let ArticleList = await ArticleModel.find({titleArticle : req.query.titleArticle, page: 'LIMIT ' + MAX_NAME});

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };
/* 
    updateArticle = async (req, res, next) => {
      
    };

    deleteArticle = async (req, res, next) => {
     
    };
 */
    formatEndFilter(params = {},matched){
        params.sort = matched.sort && matched.sort ;

        //params.activate = matched.activate && matched.activate ;
      
        params.order = matched.order && matched.order ;      

        const page = matched.page ? NUMBER_ARTICLE_PAGE*(matched.page) : 0;

        params.page = ' LIMIT '+ (page+','+NUMBER_ARTICLE_PAGE);
        // LIMIT a,b <=> LIMIT a offset b (a = page & b = number element )

        return params;
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ArticleController;