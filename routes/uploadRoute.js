const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/auth')

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image. Please upload an image.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploader = async (path) =>
  await cloudinary.uploader.upload(path, {
    folder: 'Home', // Set the folder to "Home" in your Cloudinary account
    format: 'jpg', // Specify the desired file format here
  });

router.post('/upload', auth,authAdmin, upload.array('image'), async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);
      urls.push(newPath.secure_url);
    }

    // Now, you can use the URLs to create your product
    // Make sure to check that the create product feature can handle the specified file format

    res.status(200).json({
      message: 'Images uploaded successfully',
      data: urls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
