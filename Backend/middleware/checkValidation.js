const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');

exports.checkValidation = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpException(400, 'Validation faild', errors);
    }
}