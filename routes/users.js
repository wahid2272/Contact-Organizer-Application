'use strict';

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route link     POST api/users
// @description    Regiter users
// @access will be Public
router.post('/', [
  body('name', 'Please add your name').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password needs to be 6 or more chracters').isLength({ min: 6 })
], 
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send('test')
});

module.exports = router;