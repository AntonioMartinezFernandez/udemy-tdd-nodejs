//import { jest } from '@jest/globals';

import request from 'supertest';

import { appTest } from '../../../server.js';

describe('Server Integration Test', () => {
  describe('Endpoints', () => {
    describe('Post POST', () => {
      test('Create a new post', async () => {
        const response = await request(appTest)
          .post('/post')
          .send({ userId: 5, title: 'Título', body: 'Cuerpo del post' })
          .set('user_id', 1)
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toEqual(201);
        expect(response.body.userId).toEqual(5);
        expect(response.body).toHaveProperty('id');
      });

      test('Fail creating a new post with error 401 if user is not authenticated', async () => {
        const response = await request(appTest)
          .post('/post')
          .send({ userId: 5, title: 'Título', body: 'Cuerpo del post' })
          .set('user_id', 3)
          .set('Content-Type', 'application/json');

        expect(response.statusCode).toEqual(401);
      });
    });

    test('Fail creating a new post with error 400 if user do not exist', async () => {
      const response = await request(appTest)
        .post('/post')
        .send({ userId: 500, title: 'Título', body: 'Cuerpo del post' })
        .set('user_id', 1)
        .set('Content-Type', 'application/json');

      expect(response.statusCode).toEqual(400);
    });
  });
});
