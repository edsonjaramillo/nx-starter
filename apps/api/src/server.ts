import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './env';

console.warn('Server is running on http://localhost:8080');
serve({ fetch: app.fetch, port: env.PORT });
