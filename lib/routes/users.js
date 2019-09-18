const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()


  .post('/', (req, res, next) => {
    const { email } = req.body;
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
          res.send(user[0]);
        }
      });
  });
