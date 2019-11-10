import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Idea from '../src/app/models/Idea';

factory.define('User', User, {
  first_name: faker.name.firstName(),
  last_name: faker.name.firstName(),
  nickname: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Idea', Idea, {
  title: faker.name.title,
  description: faker.random.word,
  sub_title: faker.commerce.productName,
  contact: faker.phone.phoneNumber,
  first_comment: faker.name.jobDescriptor,
  status: 'draft',
});

export default factory;
