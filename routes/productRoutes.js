const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


const router = express.Router();


// POST a new product
router.post('/products', auth, authAdmin, createProduct);

// GET all products
router.get('/products', getProducts);

// GET a single product
router.get('/products/:id', getProduct);

// DELETE a product
router.delete('/products/:id', auth, authAdmin, deleteProduct);

// UPDATE a product
router.put('/products/:id', auth, authAdmin, updateProduct);

module.exports = router;
