import { serve } from '@hono/node-server';
import { apiEnv } from './api-env';
import { app } from './app';

console.warn(`Starting API server on port ${apiEnv.API_PORT}`);
serve({ fetch: app.fetch, port: apiEnv.API_PORT });
