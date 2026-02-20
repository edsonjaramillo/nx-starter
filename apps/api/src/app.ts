import { openapi } from '@elysiajs/openapi';
import { JSend } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { Elysia } from 'elysia';
import { z } from 'zod';
import packageJson from '../package.json';
import { userRouter } from './routes/users/users-routes';

export const app = new Elysia()
	.use(
		openapi({
			mapJsonSchema: {
				zod: z.toJSONSchema,
			},
			documentation: {
				info: {
					title: 'Nx Monorepo API',
					description: 'API documentation for the Nx Monorepo project',
					version: packageJson.version,
				},
			},
		})
	)
	.onError(({ code, set }) => {
		if (code === 'VALIDATION') {
			set.status = HttpStatus.BAD_REQUEST;
			return JSend.error('Invalid request payload.');
		}
		return JSend.error('An unexpected error occurred.');
	})
	.use(userRouter);
