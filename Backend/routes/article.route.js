const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article.controller');
const { authUser } = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createArticleSchema, findArticle } = require('../middleware/validators/articleValidator.middleware');

// add new article
router.post('/',authUser(Role.Admin,Role.Professional), createArticleSchema, awaitHandlerFactory(ArticleController.createArticle)); 
// search article wich is in catalog by params
router.get('/', findArticle, awaitHandlerFactory(ArticleController.getArticlesByParams)); 

// article wich have this idArticle
router.get('/one/:idArticle', awaitHandlerFactory(ArticleController.getArticleById)); 

// get & says if already use in catalogId
router.get('/already/:catalogId', findArticle, awaitHandlerFactory(ArticleController.getArticlesWithAlredyUseByParams)); 

router.get('/categorys', awaitHandlerFactory(ArticleController.getAllCatgory)); 

router.get('/catalogs', findArticle, awaitHandlerFactory(ArticleController.getArticlesCatalogByParams)); 
// search articles of catalog
router.get('/catalogs/:catalogId', findArticle, awaitHandlerFactory(ArticleController.getArticlesOfCatalog)); 
// autocomplete on name
router.get('/title', awaitHandlerFactory(ArticleController.getArticlesTitle)); 
// detail article (Info : user catalog : article)
router.get('/catalogs/user/:id_Catalog/:id_Article', awaitHandlerFactory(ArticleController.getArticlesDetails)); 

// router.patch('/:idArticle', awaitHandlerFactory(ArticleController.updateArticle)); 
// router.delete('/:idArticle', awaitHandlerFactory(ArticleController.deleteArticle));


module.exports = router;