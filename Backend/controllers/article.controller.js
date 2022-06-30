const ArticleModel = require('../models/Article.model');
const HttpException = require('../utils/HttpException.utils');
const {checkValidation} = require('../middleware/checkValidation')
const dotenv = require('dotenv');
dotenv.config();
const { matchedData } = require('express-validator');
const CatalogController = require('./catalog.controller');
const userModel = require('../models/user.model');
const CatalogModel = require('../models/Catalog.model');
const userController = require('./user.controller');
const { cp } = require('fs');

module.exports = NUMBER_ARTICLE_PAGE = 10;
/******************************************************************************
 *                              Article Controller
 ******************************************************************************/
 
class ArticleController {

    createArticle = async (req, res, next) => {
        // Limiter le choix aux attributs connus
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
    
    // display if article already use in catalog
    getAllCatgory = async (req, res, next) => {
        console.log("enter");

        let categorys = await ArticleModel.findCategory();
        let subCategorys = await ArticleModel.findSubCategory();
        
        console.log('category :>> ', categorys);
        console.log('subCategorys :>> ', subCategorys);

        if (!categorys) {
            throw new HttpException(404, 'categorys not found');
        }
        const categorysList = categorys.map(cat => {
            return {
                ...cat,
                "subCategorys":subCategorys.filter(sub => sub.id_Category = cat.idCategory)
            }
        })

        res.send(categorysList);
    };

    getArticlesWithAlredyUseByParams = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });

        checkValidation(req);

        let params = {} ;

        params = this.formatArticleParams(params,matched);
        params = CatalogController.formatCatalogParams(params,matched);
        params = this.formatEndFilter(params,matched);

        let ArticleList = await ArticleModel.findNotAlreadyAdd(
            req.params.catalogId,params);

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    getArticlesByParams = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });

        checkValidation(req);

        let params = {} ;

        params = this.formatArticleParams(params,matched);
        params = CatalogController.formatCatalogParams(params,matched);
        params = this.formatEndFilter(params,matched);

        let ArticleList = await ArticleModel.find(params);

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    // return article & their catalog informations
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
        let ArticleList = await ArticleModel.findInCatalogs(params);

        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    
    getArticlesOfCatalog = async (req, res, next) => {

        const matched = matchedData(req, {
            includeOptionals: true,
        });
        checkValidation(req);

        let params = {} ;

        params = this.formatArticleParams(params,matched);
        params = CatalogController.formatCatalogParams(params,matched);
        params = this.formatEndFilter(params,matched);

        //params.order = "position";

        console.log('diplay req.params.catalogId :>> ', req.params.catalogId,);
        let ArticleList = 
        await ArticleModel.findArticleByIdCatalog(
            req.params.catalogId, params);
            
        if (!ArticleList) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(ArticleList);
    };

    // find user , catalog , category information of article
    getArticlesDetails = async (req, res, next) => {

        // const matched = matchedData(req, {
        //     includeOptionals: true,
        // });
        // checkValidation(req);
        
        let ArticleList = 
        await ArticleModel.findArticleCatalogUserByIdCatalog(
            req.params.id_Catalog,
            req.params.id_Article);
            
            console.log("params ", req.params)
        const result = ArticleList[0]; 
        if (!result) {
            throw new HttpException(404, 'Articles not found');
        }

        const data = {
            user : userController.constructorUser(result),
            catalog : CatalogController.constructorCatalog(result),
            article : this.constructorArticle(result),
        }
        res.send(data);
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

    getArticleById = async (req, res, next) => {
        const idArticle = req.params.idArticle;

        let article = await ArticleModel.find({ idArticle });

        if (!article) {
            throw new HttpException(404, 'Articles not found');
        }

        res.send(article[0]);
    };
/* 
    updateArticle = async (req, res, next) => {
      
    };

    deleteArticle = async (req, res, next) => {
     
    };
 */

    constructorArticle = (newArticle) => {
        //const test = "linkd,autre2,autre3";
        //newArticle.imagesArticle = test;
        const imgs = newArticle.imagesArticle ? newArticle.imagesArticle.split(',') : [];
       // console.log(">>newArticle : " + JSON.stringify(newArticle));
        
        return {
            idArticle: newArticle.idArticle,
            titleArticle: newArticle.titleArticle,
            priceArticle: newArticle.priceArticle,
            descriptionArticle: newArticle.descriptionArticle,
            imagesArticle : imgs
        };
    }

    /** Functions utils */

    formatArticleParams(params = {},matched){
        
        params.idArticle = matched.idArticle && matched.idArticle ;

        params.id_SubCategory = matched.id_SubCategory && matched.id_SubCategory ;

        params.titleArticle = matched.titleArticle && matched.titleArticle ;

        params.descriptionArticle = matched.descriptionArticle && matched.descriptionArticle ;

        params.priceMin = matched.priceMin && matched.priceMin ;
        params.priceMax = matched.priceMax && matched.priceMax ;

        return params;
    }

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