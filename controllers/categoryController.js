const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name} = req.body;
    const category = await Category.findOne({ name });
    if (category)
      return res.status(400).json({ error: "Category already exists." });

    const newCategory = new Category({ name, description });

    await newCategory.save();

    res.json({ message: "Category created successfully." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCategory = async (req, res) => {
    try{
        await Category.findByIdAndDelete(req?.params?.id)
        res.json({mssg: 'Category deleted'})

    }catch (err){
        return res.status(500).json({ msg: err.message });
    }
}

const updateCategory = async (req, res) => {
    try{
        const {name} = req.body
        await Category.findOneAndUpdate({_id: req.params.id}, {name})

        res.json({mssg: 'Category updated successfully'})

    }catch (err){
        return res.status(500).json({msg: err.message});
    }

}

module.exports = { getCategories, createCategory, deleteCategory, updateCategory };
