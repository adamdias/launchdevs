import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import User from '../../../src/app/models/User';

describe('User Recover Password', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be possible request recovery password', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/v1/users')
      .send(user);

    const response = await request(app)
      .post('/v1/users/recover')
      .send({ email: user.email });

    expect(response.status).toBe(204);
  });

  it('should be not able recovery with not confirm password', async () => {
    const response = await request(app)
      .put('/v1/users/recover/token')
      .send({
        password: '123123',
      });

    expect(response.status).toBe(400);
  });

  it('should be not able recovery with new invalid password', async () => {
    const response = await request(app)
      .put('/v1/users/recover/token')
      .send({
        password: '12345',
        confirmPassword: '12345',
      });

    expect(response.status).toBe(400);
  });

  it('should be possible recovery password', async () => {
    const user = await factory.attrs('User');

    const created = await request(app)
      .post('/v1/users')
      .send(user);

    await request(app)
      .post('/v1/users/recover')
      .send({ email: user.email });

    const { recover_pass_token, email } = await User.findByPk(created.body.id);

    const response = await request(app)
      .put(`/v1/users/recover/${recover_pass_token}`)
      .send({
        password: '123123',
        confirmPassword: '123123',
      });

    const { recover_pass_token: recoverUpdate } = await User.findByPk(
      created.body.id
    );

    const login = await request(app)
      .post('/v1/sessions')
      .send({
        email,
        password: '123123',
      });

    expect(response.status).toBe(200);
    expect(login.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('nickname');
    expect(response.body).toHaveProperty('first_name');
    expect(login.body).toHaveProperty('token');
    expect(recoverUpdate).toBeNull();
  });
});
