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
  })

  //$addToSet operator adds a value to an array unless the value is already present,
  //in which case addToSet does nothing to that array
  .patch('/friends/add', ensureAuth, (req, res, next) => {
    const { email } = req.body;
    User
      .findOne({ email: req.user.email })
      .then(currentUser => {
        User
          .findOneAndUpdate({ email }, { $addToSet: { friendInvitations: currentUser._id } }, { new: true })
          .then(updatedUser => {
            res.send(updatedUser);
          });
      })
      .catch(next);
  });
