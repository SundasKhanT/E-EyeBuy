const express = require('express')
const {getTypes, createType, deleteType, updateType} = require('../controllers/typecontroller')
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


const router = express.Router()


router.get('/type',  getTypes)

router.post('/type', auth, authAdmin, createType)

router.delete('/type/:id', auth, authAdmin, deleteType)

router.put('/type/:id', auth, authAdmin, updateType)


module.exports = router