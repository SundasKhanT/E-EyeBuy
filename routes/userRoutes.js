const express = require("express");
const {
  register,
  refreshToken,
  login,
  logout,
  getUser,
  addCart,
  history
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/refresh_token", refreshToken);

router.get("/infor", auth, getUser);

router.patch('/addCart', auth, addCart)

router.get('/history', auth, history);




module.exports = router;
