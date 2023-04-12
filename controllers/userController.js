const Users = require("../models/userModel");
const Payments = require("../models/PaymentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "The email already exists." });

    if (password?.length < 6)
      return res
        .status(400)
        .json({ msg: "The password must be at least 6 characters long." });

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new Users({
      name,
      email,
      password: hash,
    });

    // Save user in the database
    await newUser.save();

    // Create JWT to authenticate user
    const token = createToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    //If login success create a token and refresh token
    const token = createToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ token });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const refreshToken = (req, res) => {
  try {
    const rfToken = req?.cookies?.refreshToken;
    if (!rfToken)
      return res.status(400).json({ msg: "Please login or register" });

    jwt.verify(rfToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ msg: "Please login or register" });
      }

      const token = createToken({ id: user.id });

      res.json({ token });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getUser = async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.user.id }).select('-password');
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
 };

 const addCart = async(req, res) =>{
  try{
    const user = await Users.findById(req.user.id)
    if(!user) return res.status(400).json({message: 'User does not found'})

    await Users.findOneAndUpdate({_id: req.user.id},{
      cart: req.body.cart
    })

    return res.status(200).json({message: 'Added to cart'})
     
  }catch(err){
     return res.status(500).json({ msg: err.message });
  }

 }

const history = async (req, res) =>{
  try{
    const history = await Payments.find({user_id: req.user.id})


    res.json(history)

  }catch(err){
    return res.status(500).json({ msg: err.message });
  }

}


const createToken = (user) => {
  return jwt.sign(user, process.env.SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "1d" });
};

module.exports = { register, login, refreshToken, logout, getUser, addCart, history};
