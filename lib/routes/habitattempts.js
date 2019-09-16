const { Router } = require('express');
const HabitAttempt = require('../models/HabitAttempt');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { habit } = req.body;
    HabitAttempt
      .create({ habit })
      .then(habitAttempt => {
        res.send(habitAttempt);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { progress } = req.body;

    HabitAttempt
      .findOneAndUpdate({ _id: req.params.id }, { progress: progress }, { new: true })
      .then(updatedAttempt => res.send(updatedAttempt))
      .catch(next);
  });
