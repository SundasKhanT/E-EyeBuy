const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    images: {
      type: Object,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    shape: {
      type: String,
      required: true,
    },

    brand:{
      type:String,
      required: true
    },

    checked: {
      type: Boolean,
      required: false,
    },

    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
