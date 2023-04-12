const Payments = require("../models/PaymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const getPayments = async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const createPayment = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const { cart, address, city, postalCode, total } = req.body;
    const { _id, name, email } = user;

    const newPayment = new Payments({
      user_id: _id,
      name,
      email,
      city,
      postalCode,
      address, 
      cart,
      total
    });

    cart?.filter((item) => {
      return sold(item._id, item.quantity, item.sold);
    });
    await newPayment.save();
    res.json(newPayment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const sold = async (id, quantity, oldSold) => {
  await Products.findByIdAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold
    }
  );
};


module.exports = { getPayments, createPayment };
