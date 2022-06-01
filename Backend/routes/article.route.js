const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/Article.controller');
// const { authUser , authArticle } = require('../middleware/auth.middleware');
// const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

//const { createArticleSchema, updateArticleSchema, validateSearch } = require('../middleware/validators/ArticleValidator.middleware');

router.post('/:id', awaitHandlerFactory(ArticleController.createArticle)); // localhost:3000/api/Articles
router.get('/', awaitHandlerFactory(ArticleController.getArticlesByName)); // localhost:3000/api/Articles
// router.get('/user/:id', awaitHandlerFactory(ArticleController.getArticleByIdUser)); // localhost:3000/api/Articles
// router.get('/:id', awaitHandlerFactory(ArticleController.getArticleByIdArticle)); // localhost:3000/api/Articles
router.patch('/:id', awaitHandlerFactory(ArticleController.updateArticle)); // localhost:3000/api/Articles/id/1 , using patch for partial update
router.delete('/:id', awaitHandlerFactory(ArticleController.deleteArticle)); // localhost:3000/api/Articles/id/1
//router.get('/:id/calendar', awaitHandlerFactory(ArticleController.findTimeslotsById)); // localhost:3000/api/Articles
//router.post('/:id/calendar', awaitHandlerFactory(ArticleController.saveTimeslots)); // localhost:3000/api/Articles

module.exports = router;