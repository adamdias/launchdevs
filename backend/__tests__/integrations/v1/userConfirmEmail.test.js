import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';
import User from '../../../src/app/models/User';

describe('User Confirma Email', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be possible confirm email', async () => {
    const user = await factory.attrs('User');

    const created = await request(app)
      .post('/v1/users')
      .send(user);

    const { confirm_email_token } = await User.findByPk(created.body.id);

    const response = await request(app)
      .put('/v1/users/confirmemail')
      .send({
        token: confirm_email_token,
      });

    const {
      confirm_email_token: confirmUpdate,
      confirm_email,
    } = await User.findByPk(created.body.id);

    expect(response.status).toBe(204);
    expect(confirmUpdate).toBeNull();
    expect(confirm_email).toBeTruthy();
  });

  it('should be possible send new request for confirm email', async () => {
    const user = await factory.attrs('User');

    const created = await request(app)
      .post('/v1/users')
      .send(user);

    const login = await request(app)
      .post('/v1/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .post('/v1/users/confirmemail')
      .set('Authorization', `Bearer ${login.body.token}`);

    const { confirm_email_token, confirm_email } = await User.findByPk(
      created.body.id
    );

    expect(response.status).toBe(204);
    expect(confirm_email_token).toBeDefined();
    expect(confirm_email).toBeFalsy();
  });
});
