const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Brand', brandSchema)