const { query, param, body, check } = require('express-validator');
const CatalogModel = require('../../models/Catalog.model');
const Role = require('../../utils/userRoles');


exports.createCatalogSchema = [
    check('titleCatalog')
        .exists()
        .withMessage('The titleCatalog is required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    check('addressCatalog')
        .optional()
        .isLength({ min: 2 })
        .withMessage('addressCatalog Must be at least 1 chars long'),
    check('latitude')
        .optional()
        .isFloat()
        .withMessage('latitude must be a float')
        .custom((value, { req }) => req.body.longitude )
        .withMessage('latitude is required if longitude exist'),
    check('longitude')
        .optional()
        .isFloat()
        .withMessage('longitude must be a float')
        .custom((value, { req }) => req.body.latitude)
        .withMessage('longitude is required if latitude exist')
];

exports.findCatalog = [
    check('idCatalog')
        .optional()
        .isInt()
        .withMessage('idCatalog must be a integer'),
    check('id_User')
        .optional()
        .isInt()
        .withMessage('id_User must be a integer'),
    check('titleCatalog')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
    check('addressCatalog')
        .optional()
        .isLength({ min: 1 })
        .withMessage('addressCatalog Must be at least 1 chars long'),
    check('latitude')
        .optional()
        .isFloat()
        .withMessage('latitude must be a float')
        .custom((value, { req }) => req.body.longitude )
        .withMessage('latitude is required if longitude exist'),
    check('longitude')
        .optional()
        .isFloat()
        .withMessage('longitude must be a float')
        .custom((value, { req }) => req.body.latitude)
        .withMessage('longitude is required if latitude exist'),
    check('sort')
        .optional()
        .isIn(['idCatalog','titleCatalog','activateCatalog','id_User','addressCatalog','distance'])
        .withMessage('Invalid sort value'),
    check('order')
        .optional()
        .isIn(['ASC','DESC'])
        .withMessage('Invalid order value'),
    check('activateCatalog')
        .optional()
        .isBoolean([0,1])
        .withMessage('Activate mus be 0 or 1'),    
];

exports.addArticleCatalogSchema = [
    check('quantityArticle')
        .optional()
        .isInt()
        .withMessage('quantityArticle must be number'),
    check('availableArticle')
        .optional()
        .isBoolean([0,1])
        .withMessage('availableArticle must be boolean (0 or 1)'),
    check('rankArticle')
        .optional()
        .isInt()
        .withMessage('rankArticle must be number'),
    // check('catalogId')
    //     .custom((value, { req }) => {
    //         console.log('value :>> ', value);
    //         return CatalogModel.findById(value).then(catalog => {
    //             const userId = req.currentUser.idUser;

    //             console.log('catalog :>> ',catalog , (catalog.id_User != userId) + " other " + catalog[0].id_User+" space  " + userId);
    //             if(!catalog || !(catalog.length > 0) || 
    //             catalog[0].id_User != userId){

    //                 console.log("catalog : ",catalog);
    //                 throw new Error(403, 'Not Owner');
    //             }
    //         });

    //     })
]

// exports.catalogExist = [
//     check('id_Catalog')
//         .exists()
//         .withMessage('id_Catalog is required')
//         .custom((value, { req }) => {
//             return CatalogModel.findById(value).then(catalog => {
//                 if(!catalog || !(catalog.length > 0)){
//                     console.log("catalog : ",catalog);
//                     throw new Error("Catalog with id_Catalog doen't exist");
//                 }
//             });

//         })
// ]