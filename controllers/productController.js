const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const Type = require("../models/typeModel");
const mongoose = require("mongoose");
const { response } = require("express");


class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

     filtering = () => {
      const queryObj = {...this.queryString} //queryString = req.query
      let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
  }


    const getProducts = async(req, res) =>{
        try {
            const features = new APIfeatures(Product.find(), req.query)
            .filtering()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
  





//get a single product
const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json(product);
};

//create a new product
const createProduct = async (req, res) => {
  const { title, price, description, content, images, category, type, shape, brand } = req.body;

  if (!title || !price || !description || !category || !type ||!shape ||!brand) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      content,
      images,
      category,
      type,
      shape, 
      brand
    });
    res.status(200).json({ message: "Product created successfully", product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

  
  
//delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " No such product" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json({ mssg: "Product deleted successfully" });
};

//update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  );

  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }

  res.status(200).json({ mssg: "Product updated successfully" });
};




module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
};
