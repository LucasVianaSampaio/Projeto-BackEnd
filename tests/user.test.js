const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const User = require('../src/models/User');

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  test('It should create a new user', async () => {
    const res = await request(app)
      .post('/v1/user')
      .send({ firstname: 'John', surname: 'Doe', email: 'john@example.com', password: '123456', confirmPassword: '123456' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('It should get a user by ID', async () => {
    const user = await User.create({ firstname: 'Jane', surname: 'Doe', email: 'jane@example.com', password: '123456' });
    const res = await request(app).get(`/v1/user/${user.id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('firstname', 'Jane');
  });

  test('It should update a user', async () => {
    const user = await User.create({ firstname: 'Jack', surname: 'Doe', email: 'jack@example.com', password: '123456' });
    const res = await request(app).put(`/v1/user/${user.id}`).send({ firstname: 'Jackson', surname: 'Doe', email: 'jackson@example.com' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
  });

  test('It should delete a user', async () => {
    const user = await User.create({ firstname: 'Jim', surname: 'Doe', email: 'jim@example.com', password: '123456' });
    const res = await request(app).delete(`/v1/user/${user.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});
