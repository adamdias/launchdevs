import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';

const token = async () => {
  const user = await factory.attrs('User');

  await request(app)
    .post('/v1/users')
    .send(user);

  const login = await request(app)
    .post('/v1/sessions')
    .send({
      email: user.email,
      password: user.password,
    });

  return login.body.token;
};

export default token;
