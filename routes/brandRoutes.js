const express = require('express');
const {getBrands, createBrand, deleteBrand, updateBrand} = require('../controllers/brandcontrollers')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const router = express.Router()

router.get('/brand', getBrands)

router.post('/brand', auth, authAdmin, createBrand)

router.delete('/brand/:id', auth, authAdmin, deleteBrand)

router.put('/brand/:id', auth, authAdmin,updateBrand)




module.exports = router