const { Router } = require('express');
const Habit = require('../models/Habit');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { owner, title, frequency, goal, why } = req.body;

    Habit
      .create({ owner, title, frequency, goal, why })
      .then(habit => {
        res.send(habit);
      })
      .catch(next);
  });
