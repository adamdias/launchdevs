import request from 'supertest';
import { resolve } from 'path';
import * as fs from 'fs';
import app from '../../../src/app';
import auth from '../../util/auth';
import truncate from '../../util/truncate';

let token;

describe('User File - Avatar', () => {
  beforeEach(async () => {
    await truncate();
    token = await auth();
  });

  it('should be accept only img myme types', async () => {
    const filePath = `${__dirname}/filesTest/document.pdf`;

    const response = await request(app)
      .post('/v1/files/users')
      .attach('file', filePath)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should be upload image in user', async () => {
    const filePath = `${__dirname}/filesTest/img.jpeg`;

    const response = await request(app)
      .post('/v1/files/users')
      .attach('file', filePath)
      .set('Authorization', `Bearer ${token}`);

    const dir = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      response.body.path
    );

    const fileExists = await fs.existsSync(dir);

    if (fileExists) {
      await fs.unlinkSync(dir);
    }

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('path');
    expect(response.body).toHaveProperty('name');
  });

  it('should be update image in user', async () => {
    const filePath = `${__dirname}/filesTest/img.jpeg`;

    await request(app)
      .post('/v1/files/users')
      .attach('file', filePath)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .post('/v1/files/users')
      .attach('file', filePath)
      .set('Authorization', `Bearer ${token}`);

    const dir = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      response.body.path
    );

    const fileExists = await fs.existsSync(dir);

    if (fileExists) {
      await fs.unlinkSync(dir);
    }

    expect(response.status).toBe(200);
  });
});
