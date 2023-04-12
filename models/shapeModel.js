const mongoose = require('mongoose')

const shapeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        unique:true
    }
})


module.exports = mongoose.model('Shape', shapeSchema)