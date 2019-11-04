import request from 'supertest';
import app from '../../../src/app';
import factory from '../../factories';
// import truncate from '../../util/truncate';
import auth from '../../util/auth';

let token;

describe('Idea', () => {
  beforeEach(async () => {
    // await truncate();
    token = await auth();
  });

  it('should be able to register a idea', async () => {
    const idea = await factory.attrs('Idea');

    idea.category_id = '25e9776c-83fc-490b-a3e1-2e3f5291e419';

    const response = await request(app)
      .post('/v1/ideas')
      .set('Authorization', `Bearer ${token}`)
      .send(idea);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('author_id');
    expect(response.body).toHaveProperty('category_id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('sub_title');
    expect(response.body).toHaveProperty('contact');
    expect(response.body).toHaveProperty('first_comment');
    expect(response.body).toHaveProperty('status');
  });

  it('should be not able to register an idea in a inexisting category', async () => {
    const idea = await factory.attrs('Idea');

    idea.category_id = '13e9776c-83fc-490b-a3e1-2e3f5291e419';

    const response = await request(app)
      .post('/v1/ideas')
      .set('Authorization', `Bearer ${token}`)
      .send(idea);

    expect(response.status).toBe(404);
  });
});
