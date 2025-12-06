import type { AppOpenAPI, ZodSchema } from './open-api-types';
import { Scalar } from '@scalar/hono-api-reference';
import packageJSON from '../../package.json' with { type: 'json' };

export function jsonContent<T>(schema: T, description: string) {
	return {
		content: {
			'application/json': {
				schema,
			},
		},
		description,
	};
}

export function jsonContentRequired<T extends ZodSchema>(
	schema: T,
	description: string
) {
	return {
		...jsonContent(schema, description),
		required: true,
	};
}

export function configureOpenAPI(app: AppOpenAPI): void {
	app.doc('/doc', {
		openapi: '3.0.0',
		info: {
			version: packageJSON.version,
			title: 'Tasks API',
		},
	});

	app.get(
		'/reference',
		Scalar({
			url: '/doc',
			theme: 'kepler',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'js',
				clientKey: 'fetch',
			},
		})
	);
}
