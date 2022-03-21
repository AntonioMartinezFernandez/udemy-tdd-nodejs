import { jest } from '@jest/globals';

import Users from './index.js';

describe('Endpoints', () => {
  describe('Users', () => {
    describe('get', () => {
      test('return user json', async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {};

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        const handlers = new Users({ axios });

        await handlers.get(req, res);

        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
      });
    });

    describe('post', () => {
      test('creates a resource', async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          body: {
            name: 'myName',
            username: 'myUsername',
          },
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        const handlers = new Users({ axios });

        await handlers.post(req, res);

        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users', req.body]]);
      });
    });

    describe('put', () => {
      test('updates a resource', async () => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          params: {
            id: 5,
          },
          body: {
            name: 'newName',
            username: 'newUsername',
          },
        };

        const res = {
          sendStatus: jest.fn().mockReturnThis(),
        };

        const handlers = new Users({ axios });

        await handlers.put(req, res);

        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.put.mock.calls).toEqual([[`https://jsonplaceholder.typicode.com/users/5`, req.body]]);
      });
    });

    describe('delete', () => {
      test('deletes a resource', async () => {
        const axios = {
          delete: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          params: {
            id: 5,
          },
        };

        const res = {
          sendStatus: jest.fn().mockReturnThis(),
        };

        const handlers = new Users({ axios });

        await handlers.delete(req, res);

        expect(res.sendStatus.mock.calls).toEqual([[204]]);
        expect(axios.delete.mock.calls).toEqual([[`https://jsonplaceholder.typicode.com/users/5`]]);
      });
    });
  });
});
