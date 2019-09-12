const { Router } = require('express');
const Habit = require('../models/Habit');
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

  .get('/user/:id', (req, res, next) => {
    Habit
      .find({ owner: req.params.id })
      .then(habits => res.send(habits))
      .catch(next);
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
