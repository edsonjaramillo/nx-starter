import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './env';

console.warn(`Starting API server on port ${env.API_PORT}`);
serve({ fetch: app.fetch, port: env.API_PORT });
