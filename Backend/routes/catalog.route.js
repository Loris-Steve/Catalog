const express = require('express');
const router = express.Router();
// const CatalogController = require('../controllers/Catalog.controller');
// const { authUser , authCatalog } = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

//const { createCatalogSchema, updateCatalogSchema, validateSearch } = require('../middleware/validators/CatalogValidator.middleware');

router.post('/:id', awaitHandlerFactory(CatalogController.createCatalog)); // localhost:3000/api/Catalogs
router.get('/', awaitHandlerFactory(CatalogController.getAllCatalogs)); // localhost:3000/api/Catalogs
router.get('/user/:id', awaitHandlerFactory(CatalogController.getCatalogByIdUser)); // localhost:3000/api/Catalogs
router.get('/:id', awaitHandlerFactory(CatalogController.getCatalogByIdCatalog)); // localhost:3000/api/Catalogs
router.patch('/:id', awaitHandlerFactory(CatalogController.updateCatalog)); // localhost:3000/api/Catalogs/id/1 , using patch for partial update
router.delete('/:id', awaitHandlerFactory(CatalogController.deleteCatalog)); // localhost:3000/api/Catalogs/id/1
//router.get('/:id/calendar', awaitHandlerFactory(CatalogController.findTimeslotsById)); // localhost:3000/api/Catalogs
//router.post('/:id/calendar', awaitHandlerFactory(CatalogController.saveTimeslots)); // localhost:3000/api/Catalogs

module.exports = router;