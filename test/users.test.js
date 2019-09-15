require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

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

  it('can patch/send friend request by email', async() => {
    //represents current signed in user
    const currentUser = await User.create({ email: 'test@test.com' });
    //represents user youre going to add
    const user = await User.create({ email: 'addme@test.com' });
    return request(app)
      .patch('/api/v1/users')
      .send({ email: 'addme@test.com' })
      .then(res => {
        console.log(res.body)
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: user.email,
          friends: [],
          friendInvitations: [currentUser._id]
        });
      });
  });
});
