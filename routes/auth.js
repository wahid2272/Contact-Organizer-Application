'use strict';

const express = require('express');
const router = express.Router();

// @route link     GET api/auth
// @description    User get logged in 
// @access will be Private
router.get('/', (req, res) => {
  res.send('Get a logged in used')
});

// @route link     POST api/auth
// @description    Authenticate user & get token
// @access will be Public
router.post('/', (req, res) => {
  res.send('Log in a user')
});

module.exports = router;