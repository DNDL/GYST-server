const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { email } = req.body;
    console.log('IN CREATE USER ROUTE - email: ', email);
    User
      .find({ email })
      .then(user => {
        if(!user[0]) {
          User
            .create({ email })
            .then(user => {
              res.send(user);
            })
            .catch(next);
        } else {
          res.send(user);
        }
      });
  });
