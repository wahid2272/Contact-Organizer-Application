'use strict';

const express = require('express');
const router = express.Router();

// @route link     POST api/users
// @description    Regiter users
// @access will be Public
router.post('/', (req, res) => {
  res.send('Register a user')
});

module.exports = router;