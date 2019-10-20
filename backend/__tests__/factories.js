import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  first_name: faker.name.firstName(),
  last_name: faker.name.firstName(),
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
