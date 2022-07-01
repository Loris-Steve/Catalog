require('dotenv').config();

// server 
const PORT = 4000

//token
const JWT_SIGN_SECRET = "CATALOG_JWT_SIGN_SECRET"

module.exports = {
  PORT: process.env.PORT || PORT,
  JWT_SIGN_SECRET: process.env.JWT_SIGN_SECRET || JWT_SIGN_SECRET , // mettre quelque chose de grand lond et compliqué pour signer le token (ep 4 - 17.6)  
};
