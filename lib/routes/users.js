const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { email } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          User
            .create({ email })
            .then(user => {
              res.send(user);
            })
            .catch(next);
        }
        res.send(user);
      });
  });
