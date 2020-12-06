'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route link     GET api/auth
// @description    User get logged in 
// @access will be Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route link     POST api/auth
// @description    Authenticate user & get token
// @access will be Public
router.post('/', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ msg: 'Credentials are not valid'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({ msg: 'Credentials are not valid'})
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jsonwebtoken.sign(payload, config.get('jsonwebtokenSecret'), (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sorry, Server Error')
  }
 }
);

module.exports = router;