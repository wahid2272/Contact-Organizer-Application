'use strict';

const jsonwebtoken = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
  // This will get token from postman header
  const token = req.header('x-auth-token');

  // Token authorization check
  if(!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }
  try {
    const decode = jsonwebtoken.verify(token, config.get('jsonwebtokenSecret'));

    req.user = decode.user;
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid'})
  }
}