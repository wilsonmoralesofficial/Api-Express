const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema , updateProductSchema , getProductSchema} = require('../schemas/product.schema');


const router = express.Router();
const productService = new ProductsService();


router.get('/', async (req, res) => {
  const products = await productService.find();
  res.json(products);
});

// router.get('/:id', async (req, res,next) => {
//   try {
//     const { id } = req.params;
//     const product = await productService.findOne(id);
//     res.json(product);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/:id',
validatorHandler(getProductSchema,'params'),
async (req, res,next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/*
PETICIONES TIPO POST
 */
router.post('/',
validatorHandler(createProductSchema,'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json(newProduct);
});

/*
PETICIONES TIPO PUT O PATCH
 */
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req, res , next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productService.update(id, body);
    res.json({
      message: 'UPDATE',
      ...product
    });

  } catch (error) {
    next(error);
  }

});

/*
PETICIONES TIPO DELETE
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const repuesta = await productService.delete(id);
  res.json({
    message: 'DELETED',
    ...repuesta,
  });
});

module.exports = router;
