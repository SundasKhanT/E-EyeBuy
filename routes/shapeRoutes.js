const express = require('express');
const {getShapes, createShape, deleteShape, updateShape} = require('../controllers/shapeController')
const auth = require('../middleware/auth')
const authAdmin = require ("../middleware/authAdmin")

const router = express.Router()

router.get("/shape", getShapes)

router.post("/shape", auth, authAdmin, createShape)

router.delete("/shape/:id", auth, authAdmin, deleteShape)

router.patch("/shape/:id", auth, authAdmin, updateShape)


module.exports = router