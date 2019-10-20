import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/v1/users')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('nickname');
  });

  it('should be not able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app)
      .post('/v1/users')
      .send(user);

    expect(response.status).toBe(401);
  });

  it('should be not able to register with duplicated nickname', async () => {
    const user_1 = await factory.attrs('User', {
      email: 'testin@test.com',
      nickname: 'testing',
    });

    const user_2 = await factory.attrs('User', {
      nickname: 'testing',
    });

    await request(app)
      .post('/v1/users')
      .send(user_1);

    const response = await request(app)
      .post('/v1/users')
      .send(user_2);

    expect(response.status).toBe(401);
  });

  it('nickname should be not a number', async () => {
    const user = await factory.attrs('User', {
      nickname: '123',
    });

    const response = await request(app)
      .post('/v1/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('email should be not valid', async () => {
    const user = await factory.attrs('User', {
      email: '89asda@ttttttt',
    });

    const response = await request(app)
      .post('/v1/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be show a user by nickname', async () => {
    const user = await factory.attrs('User');

    const created = await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app).get(
      `/v1/users/nickname/${created.body.nickname}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('nickname');
    expect(response.body).toHaveProperty('bio');
    expect(response.body).toHaveProperty('github');
    expect(response.body).toHaveProperty('linkedin');
    expect(response.body.password_hash).toBeUndefined();
  });

  it('should be not found a user by nickname nonexistent', async () => {
    const response = await request(app).get(`/v1/users/nickname/testing`);

    expect(response.status).toBe(404);
  });
});
