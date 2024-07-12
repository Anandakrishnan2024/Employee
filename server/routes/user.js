const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User'); // Assuming your user model is defined in User.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads')); // Ensure this path is correct
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); // Get file extension
      const filename = `uploads\\${Date.now()}${ext}`; // Construct filename with desired path format
      req.imagePath = filename; // Save the filename to request object
      cb(null, path.basename(filename)); // Use filename without directory for multer
    }
  });

const upload = multer({ storage: storage });

// User registration route
router.post('/register', upload.single('profilePic'), async (req, res) => {
  const { name, email, phone, address, designation, password } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !phone || !address || !designation || !req.file || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let salt = await bcrypt.genSalt(10);
    console.log("salt : ", salt);

    let hashed_password = bcrypt.hashSync(password, salt);
    console.log("hashed_password : ", hashed_password);
    // Create new user instance
    const newUser = new User({
      name,
      email,
      phone,
      address,
      designation,
      profilePic: req.imagePath ,// Store the image path with desired format
      password: hashed_password
    });

    // Save user to the database
    const savedUser = await newUser.save();

    console.log('User registered successfully:', savedUser);

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
          email: user.email
          // Add more fields as needed
        }
      };
  
      // Sign JWT
     const JWT_SECRET = 'nBwv2dGtnomK+VC6hOz86A=='
      jwt.sign(
        payload,
        JWT_SECRET, // Your JWT secret key
        { expiresIn: '1h' }, // Token expiration (optional)
        (err, token) => {
          if (err) throw err;
          res.json({ message: 'Login success', token, user: payload.user });
        }
      );
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/users/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
