require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SIGN_SECRET: process.env.JWT_SIGN_SECRET , // mettre quelque chose de grand lond et compliqué pour signer le token (ep 4 - 17.6)  
};
