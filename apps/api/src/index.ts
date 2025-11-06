import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './env';

console.warn(`Starting API server on port ${env.PORT}`);
serve({ fetch: app.fetch, port: env.PORT });
