require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
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

  it('can create a habit using /POST', async done => {
    const user = await User.create({ email: 'test@test.com' });
    return request(app)
      .post('/api/v1/habits')
      .send({ owner: user._id, title: 'Noahs habit', frequency: 'Daily', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          owner: user._id.toString(),
          title: 'Noahs habit',
          frequency: 'Daily',
          goal: 2,
          days: { m: true },
          color: 'blue',
          why: 'Cause'
        });
        done();
      });
  });

  it('can get the current signed in users habits', async done => {
    const user = await User.create({ email: 'test@test.com' });
    await Habit.create({ owner: user._id, title: 'Test habit1', frequency: 'Weekly', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' });
    await Habit.create({ owner: user._id, title: 'Test habit2', frequency: 'Daily', goal: 1, days: { m: true }, color: 'blue', why: 'Cause' });
    return request(app)
      .get('/api/v1/habits/')
      .then(res => {
        expect(res.body).toHaveLength(2);
        done();
      });
  });

  it('can update a habit', async done => {
    const user = await User.create({ email: 'test@test.com' });
    const habit = await Habit.create({ owner: user._id, title: 'Test habit1', frequency: 'Weekly', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' });
    return request(app)
      .patch(`/api/v1/habits/${habit._id}`)
      .send({ frequency: 'Daily', goal: 22, why: 'FOR REASONS, DANNY', no: 'mister hogan' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          owner: user._id.toString(),
          title: 'Test habit1',
          frequency: 'Daily',
          goal: 22,
          days: { m: true },
          color: 'blue',
          why: 'FOR REASONS, DANNY'
        });
        done();
      });
  });

  it('can DUSTROYYYY a habit', async done => {
    const user = await User.create({ email: 'test@test.com' });
    const habit = await Habit.create({ owner: user._id, title: 'Test habit1', frequency: 'Weekly', goal: 2, days: { m: true }, color: 'blue', why: 'Cause' });
    return request(app)
      .delete(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          owner: user._id.toString(),
          title: 'Test habit1',
          frequency: 'Weekly',
          goal: 2,
          days: { m: true },
          color: 'blue',
          why: 'Cause'
        });
        done();
      });
  });
});
