const mongoose = require('mongoose')



const paymentSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    
    address:{
        type: Object,
        required: true
    },

    city:{
        type: Object,
        required:true
    },

    postalCode:{
        type:Object,
        required:true
    },

    cart:{
        type: Array,
        default: []
    },

   status: {
  type: String,
  enum: ['pending', 'confirmed', 'cancelled', 'failed', 'delivered'],
  default: 'pending'
}
    }, {
        timestamps: true


})


module.exports = mongoose.model("Payments", paymentSchema)