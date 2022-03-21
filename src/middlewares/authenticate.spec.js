import { jest } from '@jest/globals';

import authenticateMiddleware from './authenticate.js';

describe('Middlewares', () => {
  describe('authenticate', () => {
    test('Should have id = "1"', () => {
      const req = {
        header: jest.fn().mockReturnValue('1'),
      };

      const res = {
        sendStatus: jest.fn(),
      };

      const next = jest.fn();

      authenticateMiddleware(req, res, next);

      expect(req.header.mock.calls).toEqual([['user_id']]);
      expect(res.sendStatus.mock.calls).toEqual([]);
      expect(next.mock.calls).toEqual([[]]);
    });

    test('should fail if user id is not 1', () => {
      const req = {
        header: jest.fn().mockReturnValue('2'),
      };

      const res = {
        sendStatus: jest.fn(),
      };

      const next = jest.fn();

      authenticateMiddleware(req, res, next);

      expect(req.header.mock.calls).toEqual([['user_id']]);
      expect(res.sendStatus.mock.calls).toEqual([[401]]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});
