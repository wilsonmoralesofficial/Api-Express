const express = require('express');

const productsRouter = require('./productos.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categorias');



function routerApi(app){

  const router = express.Router();
  app.use('/api/v1',router);

  router.use('/products',productsRouter);
  router.use('/users',usersRouter);
  router.use('/categorias',categoriesRouter);
}


module.exports = routerApi;
