const express = require('express')
const {getPayments, createPayment} = require('../controllers/paymentController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


const router = express.Router()

router.get('/payment', auth, authAdmin, getPayments)

router.post('/payment', auth,  createPayment)


module.exports = router 