const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
    },

    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: "string",
      required: true,
    },

    role: {
      type: Number,
      default: 0,
    },

    cart: {
      type: Array,
      default: [],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model('Users', userSchema)