const express = require('express');
const router = express.Router();
const CatalogController = require('../controllers/Catalog.controller');
const { authUser,isCatalogOwner } = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createCatalogSchema, catalogExist, addArticleCatalogSchema, findCatalog } = require('../middleware/validators/catalogValidator.middleware');
const { userOwner } = require('../middleware/validators/userValidator.middleware');
const { articleExist } = require('../middleware/validators/articleValidator.middleware');

// on créer un catalog pour un utilisateur
router.post('/user/:userId', authUser(Role.Admin,Role.Professional), createCatalogSchema, userOwner, awaitHandlerFactory(CatalogController.createCatalog)); 
//router.post('/article', authUser(Role.Admin,Role.Professional), catalogExist, articleExist, addArticleCatalogSchema, awaitHandlerFactory(CatalogController.addArticleInCatalog)); 
router.post('/article/:catalogId/:articleId', authUser(Role.Admin,Role.Professional), isCatalogOwner(),addArticleCatalogSchema, awaitHandlerFactory(CatalogController.addArticleInCatalog)); 

router.get('/', findCatalog, awaitHandlerFactory(CatalogController.getCatalogsByParams)); 
router.get('/:idCatalog', awaitHandlerFactory(CatalogController.getCatalogById)); 
router.get('/user/:idUser', findCatalog, awaitHandlerFactory(CatalogController.getCatalogsByIdUser)); 

// router.patch('/:idCatalog', awaitHandlerFactory(CatalogController.updateCatalog)); 
// router.delete('/:idCatalog', awaitHandlerFactory(CatalogController.deleteCatalog));

module.exports = router;
