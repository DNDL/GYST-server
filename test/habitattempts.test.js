require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const HabitAttempt = require('../lib/models/HabitAttempt');
const User = require('../lib/models/User');
const Habit = require('../lib/models/Habit');

jest.mock('../lib/middleware/ensure-auth.js');

describe('test habit routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a habitAttempt using /POST', async() => {
    const user = await User.create({ email: 'test@test.com' });
    const habit = await Habit.create({ owner: user._id, title: 'Test habit1', frequency: 'Weekly', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' });
    return request(app)
      .post('/api/v1/habits/attempt')
      .send({ habit: habit._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: habit._id.toString(),
          progress: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });

  it('can update a habitAttempt using /PATCH', async() => {
    const user = await User.create({ email: 'test@test.com' });
    const habit = await Habit.create({ owner: user._id, title: 'Test habit1', frequency: 'Weekly', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' });
    const attempt = await HabitAttempt.create({ habit: habit._id });
    return request(app)
      .patch(`/api/v1/habits/attempt/${attempt._id}`)
      .send({ progress: 1 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          habit: habit._id.toString(),
          progress: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});
