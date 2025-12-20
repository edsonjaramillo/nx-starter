import process from 'node:process';
import { apiEnv } from './api-env';
import { app } from './app';

app.listen({ port: apiEnv.API_PORT, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}

	console.warn(`API server listening at ${address}`);
});
