const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');

// vérifie qu'il n'existe pas d'erreur dans la requête (ex: suite à nos validators)
exports.checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpException(400, 'Validation faild', errors);
    }
}