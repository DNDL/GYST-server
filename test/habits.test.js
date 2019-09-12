require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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

  const TEST_HABIT = {
    owner: '3456d7sd456sa78',
    title: 'Noahs habit',
    frequency: 'Daily',
    goal: 2,
    why: 'Cause'
  };

  it('can create a habit using /POST', () => {
    return request(app)
      .post('/api/v1/habits')
      .send(TEST_HABIT)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          owner: '3456d7sd456sa78',
          title: 'Noahs habit',
          frequency: 'Daily',
          goal: 2,
          why: 'Cause',
          __v: 0
        });
      });
  });
});
