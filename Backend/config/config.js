require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SIGN_SECRET: process.env.JWT_SIGN_SECRET , // mettre quelque chose de grand lond et compliqué pour signer le token (ep 4 - 17.6)  
  API_PNC4U_API_LINK : process.env.API_PNC4U_API_LINK ,
  MAIL_USER : process.env.MAIL_USER ,
  MAIL_PASS : process.env.MAIL_PASS 
};
