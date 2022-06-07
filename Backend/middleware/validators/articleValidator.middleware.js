const { query, param, body, check } = require('express-validator');
const ArticleModel = require('../../models/Article.model');
const Role = require('../../utils/userRoles');


exports.createArticleSchema = [
    check('titleArticle')
        .exists()
        .withMessage('The titleArticle is required')
        .isLength({ min: 3 ,max: 200 })
        .withMessage('titleArticle must have between 3 and 200 chars'),
    check('descriptionArticle')
        .optional()
        
        .isLength({ min: 3, max: 250 })
        .withMessage('descriptionArticle must have between 3 and 250 chars'),
    check('priceArticle')
        .optional()
        .isFloat()
        .withMessage('latitude must be a float'),
    check('id_SubCategory')
        .exists()
        .withMessage('The titleArticle is required')
];

exports.findArticle = [
    query('idArticle')
        .optional()
        .isInt()
        .withMessage('idArticle must be a integer'),
    query('id_SubCategory')
        .optional()
        .isInt()
        .withMessage('id_SubCategory must be a integer'),
    query('titleArticle')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    query('descriptionArticle')
        .optional()
        .isLength({ min: 1 })
        .withMessage('descriptionArticle Must be at least 1 chars long'),
    query('priceMin')
        .optional()
        .isFloat()
        .withMessage('priceArticle must be a float'),
    query('priceMax')
        .optional()
        .isFloat()
        .withMessage('priceArticle must be a float'),
    query('sort')
        .optional()
        .isIn(['idArticle','titleArticle','activate','id_User','address','distance'])
        .withMessage('Invalid sort value'),
    query('order')
        .optional()
        .isIn(['ASC','DESC'])
        .withMessage('Invalid order value'),
    query('activate')
        .optional()
        .isBoolean([0,1])
        .withMessage('Activate mus be 0 or 1'),    
];

exports.articleExist = [
    check('id_Article')
        .exists()
        .withMessage('id_Article is required')
        .custom((value, { req }) => {
            return ArticleModel.findById(value).then(article => {
                if(!article || !(article.length > 0)){
                    console.log('article :>> ', article);
                    throw new Error("Article with idArticle doen't exist");
                }
            });
        })
]