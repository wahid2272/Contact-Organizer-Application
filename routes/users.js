'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route link     POST api/users
// @description    Regiter users
// @access will be Public
router.post('/', [
  body('name', 'Please add your name').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password needs to be 6 or more chracters').isLength({ min: 6 })
], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if(user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name: name,
      email: email,
      password: password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;