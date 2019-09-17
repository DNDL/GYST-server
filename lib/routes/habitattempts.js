const { Router } = require('express');
const HabitAttempt = require('../models/HabitAttempt');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { habit } = req.body;
    User
      .findOne({ email: req.user.email })
      .then(user => {
        HabitAttempt
          .create({ owner: user._id, habit })
          .then(createdAttempt => res.send(createdAttempt))
          .catch(next);
      });
  })

  .patch('/:id', (req, res, next) => {
    const { progress } = req.body;

    HabitAttempt
      .findOneAndUpdate({ _id: req.params.id }, { progress: progress }, { new: true })
      .then(updatedAttempt => res.send(updatedAttempt))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    User
      .findOne({ email: req.user.email })
      .then(user => {
        HabitAttempt
          .find({ owner: user._id })
          .then(attempts => res.send(attempts))
          .catch(next);
      });
  });
