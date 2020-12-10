'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  img: {
    type: String,
    data: Buffer
  }
});

module.exports = mongoose.model('Contact', ContactSchema);