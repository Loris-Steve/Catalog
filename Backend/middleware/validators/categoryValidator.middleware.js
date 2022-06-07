const { query, param, body, check } = require('express-validator');
const Role = require('../../utils/userRoles');

// verify if subcategory exist
/* 
exports.categoryExist = [
    check('id_SubCategory')
        .custom((value, { req }) => {
            
        })
        .withMessage('idUser field must have the same value as the idUser  field ')
] 
*/