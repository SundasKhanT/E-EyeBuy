const mongoose = require('mongoose');

const searchSchema = mongoose.Schema({
   price: {
    type: Number,
    required: true
  },

 
});

module.exports = mongoose.model('Seaarch', searchSchema);
