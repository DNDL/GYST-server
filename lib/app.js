const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());

app.use('/api/v1/habits', require('./routes/habits'));
app.use('/api/v1/habits/attempts', require('./routes/habitattempts.js'));
app.use('/api/v1/users', require('./routes/users'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
