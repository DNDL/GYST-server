const { Router } = require('express');
const Habit = require('../models/Habit');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    console.log('req body in route', req.body);
    const { title, frequency, goal, days, color, why } = req.body;
    User
      .findOne({ email: req.user.email })
      .then(currentUser => {
        Habit
          .create({ owner: currentUser._id, title, frequency, goal, days, color, why })
          .then(habit => {
            res.send(habit);
          })
          .catch(next);
      });
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

  .patch('/:id', ensureAuth, (req, res, next) => {
    Habit
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(patchedHabit => {
        res.send(patchedHabit);
      })
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Habit
      .findByIdAndDelete(req.params.id)
      .then(deletedHabit => {
        res.send(deletedHabit);
      })
      .catch(next);
  })
;
