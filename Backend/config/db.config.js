require('dotenv').config();

const DB_HOST = "localhost"
const DB_USER = "catalog_user"
const DB_PASS = "catalog_user_password"
const DB_DATABASE = "catalogdb"

module.exports = {
  DB_HOST: process.env.DB_HOST || DB_HOST  ,
  DB_USER: process.env.DB_USER || DB_USER ,
  DB_PASS: process.env.DB_PASS || DB_PASS  ,
  DB_DATABASE: process.env.DB_DATABASE || DB_DATABASE ,
};
