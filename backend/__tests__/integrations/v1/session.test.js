import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authentication', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app)
      .post('/v1/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authentication with wrong password', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app)
      .post('/v1/sessions')
      .send({
        email: user.email,
        password: `wrong${user.password}`,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to authentication with wrong email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app)
      .post('/v1/sessions')
      .send({
        email: `wrong${user.email}`,
        password: user.password,
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to authentication with invalid email', async () => {
    const response = await request(app)
      .post('/v1/sessions')
      .send({
        email: `invalid@invalid`,
        password: 'invalid',
      });

    expect(response.status).toBe(400);
  });
});
