const express = require("express");
const dotenv = require('dotenv'); 
const cors = require("cors");
//const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const bodyParser  = require('body-parser');
//const fileUpload = require('express-fileupload');
const config = require('./config/config');

const server = express();

const userRouter = require('./routes/user.route');
const articleRouter = require('./routes/article.route');

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads

//Définition des CORS
server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader("Content-Type", "application/json");
    
  next();
});

// Body Parser configuration
server.use(bodyParser.json({ limit : '200mb'}))

server.use(bodyParser.urlencoded({
  limit: '200mb',
  extended: true,
  parameterLimit: 1000000
}));

// enabling cors for all requests by using cors middleware
server.use(cors());

//server.use(fileUpload());

const port = Number(config.PORT);

server.use(`/api/users`, userRouter);
server.use(`/api/articles`, articleRouter);

server.get('/', (req,res) => {
  res.send('Welcome to catalog API !')
})

// 404 error 
server.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
server.use(errorMiddleware);

// starting the server
server.listen(port, () =>
    console.log(`> Server running on port ${port}!`));


module.exports = server;