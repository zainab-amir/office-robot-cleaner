import fastify, { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'path';

import App from '../../../app';
import { loadEnv } from '../../../../config/app.config';
import { cleaningReportSchema, errorSchema } from '../../../utils/schema';

describe('Robot Routes', () => {
  const urlPrefix = '/tibber-developer-test';
  let app: FastifyInstance;

  beforeAll(async () => {
    loadEnv();
    app = fastify();
    await app.register(App);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /enter-path', () => {
    test('should successfully process valid robot commands', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `${urlPrefix}/enter-path`,
        payload: {
          start: { x: 0, y: 0 },
          commands: [{ direction: 'north', steps: 10 }],
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('duration');
      expect(body).toHaveProperty('timestamp');
      expect(body.commands).toEqual(1);
      expect(body.result).toBe(11);
    });

    test('handle a path that visits same locations multiple times', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `${urlPrefix}/enter-path`,
        payload: {
          start: { x: 0, y: 0 },
          commands: [
            { direction: 'north', steps: 10 },
            { direction: 'south', steps: 10 },
            { direction: 'north', steps: 10 },
            { direction: 'south', steps: 10 },
            { direction: 'north', steps: 10 },
            { direction: 'south', steps: 10 },
          ],
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.result).toBe(11);
    });

    test('handle invalid url', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `${urlPrefix}/invalid-enter-path`,
        payload: {
          start: { x: 0, y: 0 },
          commands: [{ direction: 'north', steps: 10 }],
        },
      });

      expect(response.statusCode).toBe(404);
    });

    test('return validation error', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `${urlPrefix}/enter-path`,
        payload: {
          commands: [{ direction: 'north', steps: 10 }],
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('message');
      expect(body.error).toEqual('Bad Request');
      expect(body.message).toEqual('"start" is required');
    });

    test('handle internal server error', async () => {
      // Create a fastify instance without plugins.
      const brokenApp = fastify();
      await brokenApp.register(AutoLoad, {
        dir: path.join(__dirname, '..', '..', '..', 'routes'),
        dirNameRoutePrefix: false,
        options: Object.assign({ prefix: '/tibber-developer-test' }),
      });
      brokenApp.addSchema(cleaningReportSchema);
      brokenApp.addSchema(errorSchema);

      const response = await brokenApp.inject({
        method: 'POST',
        url: `${urlPrefix}/enter-path`,
        payload: {
          start: { x: 0, y: 0 },
          commands: [{ direction: 'north', steps: 10 }],
        },
      });

      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty('error');
      expect(body).toHaveProperty('message');
      expect(body.error).toEqual('Internal Server Error');
      expect(body.message).toEqual("Cannot read properties of undefined (reading 'createCleaningReport')");

      await brokenApp.close();
    });
  });
});
