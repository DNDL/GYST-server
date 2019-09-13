const { Router } = require('express');
const Habit = require('../models/Habit');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { owner, title, frequency, goal, why } = req.body;

    Habit
      .create({ owner, title, frequency, goal, why })
      .then(habit => {
        res.send(habit);
      })
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    User
      .findOne({ email: req.user.email })
      .then(user => {
        Habit
          .find({ owner: user._id })
          .then(habits => res.send(habits))
          .catch(next);
      });
  })

  .patch('/:id', (req, res, next) => {
    Habit
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(patchedHabit => {
        res.send(patchedHabit);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Habit
      .findByIdAndDelete(req.params.id)
      .then(deletedHabit => {
        res.send(deletedHabit);
      })
      .catch(next);
  })
;
