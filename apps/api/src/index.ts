import { apiEnv } from './api-env';
import { app } from './app';

app.listen({
	hostname: '0.0.0.0',
	port: apiEnv.API_PORT,
});
