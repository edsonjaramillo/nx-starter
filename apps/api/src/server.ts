import { serve } from '@hono/node-server';
import { app } from './app';

console.warn('Server is running on http://localhost:8080');
serve({ fetch: app.fetch, port: 8080 });
