'use strict';

const express = require('express');
const router = express.Router();

// @route link     GET api/contacts
// @description    Get all users contacts
// @access will be Private
router.get('/', (req, res) => {
  res.send('Get all contacts for specific users')
});

// @route link     POST api/contacts
// @description    Add new contact
// @access will be Private
router.post('/', (req, res) => {
  res.send('Add new contact')
});

// @route link     PUT api/contacts/:id
// @description    Update an existing contact
// @access will be Private
router.put('/:id', (req, res) => {
  res.send('Update a contact')
});

// @route link     DELETE api/contacts/:id
// @description    Delete an existing contact
// @access will be Private
router.delete('/:id', (req, res) => {
  res.send('Delete a contact')
});

module.exports = router;