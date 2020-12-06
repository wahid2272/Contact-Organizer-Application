'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route link     GET api/contacts
// @description    Get all users contacts
// @access will be Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sorry, Server Error')
  }
});

// @route link     POST api/contacts
// This will       Add new contact
// @access will be Private
router.post('/', [auth, [
    body('name', 'Name is required').not().isEmpty()
  ]
], 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Picture to be added later
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      user: req.user.id
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sorry, Server Error');
  }
 }
);

// @route link     PUT api/contacts/:id
// This will       Update an existing contact
// @access will be Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone } = req.body;

  const contactsFields = {};
  if(name) contactsFields.name = name;
  if(email) contactsFields.email = email;
  if(phone) contactsFields.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Contact is not available'});

    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Request not authorized'})
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: contactsFields },
      { new: true });

      res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sorry, Server Error');
  }
});

// @route link     DELETE api/contacts/:id
// This will       Delete an existing contact
// @access will be Private
router.delete('/:id', auth, async(req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Contact is not available'});

    if(contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Request not authorized'})
    }

    await Contact.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Your contact is removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sorry, Server Error');
  }
});

module.exports = router;