import fastifySwagger from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import pacakgeJson from '../package.json';
import { userRouter } from './routes/users/users-routes';

const app = fastify();

// Fastify-type-provider-zod setup
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// OpenAPI setup
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Nx Monorepo API',
			description: 'API documentation for the Nx Monorepo project',
			version: pacakgeJson.version,
		},
	},
	transform: jsonSchemaTransform,
});

app.register(scalarUI, {
	routePrefix: '/reference',
	configuration: {
		theme: 'kepler',
		layout: 'modern',
		defaultHttpClient: {
			targetKey: 'js',
			clientKey: 'fetch',
		},
		defaultOpenAllTags: true,
	},
});

// Register routers
app.register(userRouter, { prefix: '/users' });

export { app };
