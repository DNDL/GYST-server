const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { email } = req.body;

    User
      .create({ email })
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });
