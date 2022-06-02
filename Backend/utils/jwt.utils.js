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
      isAdmin: userData.isAdmin,
    },
    config.JWT_SIGN_SECRET,
    {
      expiresIn: '4h'
    })
  },

  // get key to valid user account
  getUserIdVerify: function(token) {
    var userId = null;
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token,config.JWT_SIGN_SECRET);// compare le tokon avec le signe secret 
        console.log("verify key token : "+JSON.stringify(jwtToken));
        if(jwtToken != null)
          userId = jwtToken.idUser ? jwtToken.idUser : null;
        } catch(err) { 
        throw new HttpException(401, 'Access denied. No credentials sent!');
      }
    }
    console.log("verify USERID : "+JSON.stringify(userId));

    return userId;
  }, 
}