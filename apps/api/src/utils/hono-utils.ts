import { OpenAPIHono } from '@hono/zod-openapi';
import { JSend } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { requestId } from 'hono/request-id';

export function createRouter() {
	return new OpenAPIHono({
		strict: false,
		defaultHook: (result, c) => {
			if (!result.success) {
				return c.json(
					JSend.error('Failed validation.'),
					HttpStatus.UNPROCESSABLE_ENTITY
				);
			}
		},
	});
}

export function createApp() {
	const app = createRouter();
	app.use(requestId());
	return app;
}
