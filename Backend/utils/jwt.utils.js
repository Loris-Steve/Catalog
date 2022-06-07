const HttpException = require('../utils/HttpException.utils');
var jwt = require('jsonwebtoken');
const config = require("../config/config");

// Exported functions
module.exports = {
  getToken: function(userData) {
    return jwt.sign({
      idUser: userData.idUser,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    },
    config.JWT_SIGN_SECRET,
    {
      expiresIn: '1d'
    })
  },

  verifyToken: function(authorization) {
    const authHeader = authorization;
    const bearer = 'Bearer ';
    //console.log("autorization send : "+JSON.stringify(authorization));
    if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, 'Access denied. No credentials sent!');
    }

    const token = authHeader.replace(bearer, '');

    try {
      var jwtToken = jwt.verify(token,config.JWT_SIGN_SECRET);// compare le tokon avec le signe secret 

      return jwtToken; //({ user })
    } catch(err) { 
          //console.log("Error verify token (jwt) ");
          throw new HttpException(401, 'Access denied. incorrect credentials sent!');
    }

  },

  // get key to valid user account
  getUserIdVerify: function(token) {
    var userId = null;
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token,config.JWT_SIGN_SECRET);// compare le tokon avec le signe secret 
        //console.log("verify key token : "+JSON.stringify(jwtToken));
        if(jwtToken != null)
          userId = jwtToken.idUser ? jwtToken.idUser : null;
        else
          return null;
        
        } catch(err) { 
        throw new HttpException(401, 'Access denied. No credentials sent!');
      }
    }
    //console.log("verify USERID : "+JSON.stringify(userId));

    return userId;
  }, 
}