require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const User = require('../lib/models/User');


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

  it('can create a user using /POST', () => {
    return request(app)
      .post('/api/v1/users')
      .send({ email: 'aaaaaa@gmail.com' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          friends: [],
          friendInvitations: [],
          email: 'aaaaaa@gmail.com'
        });
      });
  });
});
