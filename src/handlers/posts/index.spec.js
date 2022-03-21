import { jest } from '@jest/globals';

import Posts from './index.js';

describe('Endpoint', () => {
  describe('Posts', () => {
    test('should create', async () => {
      const mockPost = {
        userId: 1,
        id: 1000,
        title: 'Título',
        body: 'Cuerpo del post',
      };

      const mockUsers = [{ id: 1 }, { id: 2 }];

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      const req = {
        body: mockPost,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const handlers = new Posts({ axios });
      await handlers.post(req, res);

      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
      expect(axios.get.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users']]);
      expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/posts', req.body]]);
    });

    test('should fail when user is not authenticated', async () => {
      const mockPost = {
        userId: 3,
        id: 1000,
        title: 'Título',
        body: 'Cuerpo del post',
      };

      const mockUsers = [{ id: 1 }, { id: 2 }];

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      const req = {
        body: mockPost,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn(),
      };

      const handlers = new Posts({ axios });
      await handlers.post(req, res);

      expect(axios.post.mock.calls).toEqual([]);
      expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });
  });
});
