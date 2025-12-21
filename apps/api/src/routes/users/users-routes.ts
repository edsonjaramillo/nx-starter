import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { JSend, JSendErrorSchema, JSendSuccessSchema } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { z } from 'zod';
import { UserQueries } from '../../db/queries/user-queries';
import { insertUserSchema, selectUserSchema } from '../../db/schema/users-schema';
import { paginate, paginationSchema } from '../../middleware/paginate';
import { Password } from '../../utils/password';

const tags = ['Users'];

export function userRouter(fastify: FastifyInstance, _: FastifyPluginOptions) {
	// Get users
	fastify.withTypeProvider<ZodTypeProvider>().get(
		'/',
		{
			preHandler: [paginate],
			schema: {
				querystring: paginationSchema,
				response: {
					[HttpStatus.OK]: JSendSuccessSchema(z.array(selectUserSchema)),
				},
				tags,
				description: 'Get a list of users',
			},
		},
		async (request, reply) => {
			console.warn(request.pagination);
			const users = await UserQueries.getUsers(request.pagination);
			return reply.send(JSend.success(users, 'Got users'));
		}
	);

	// Create user
	fastify.withTypeProvider<ZodTypeProvider>().post(
		'/',
		{
			schema: {
				body: insertUserSchema,
				response: {
					[HttpStatus.CREATED]: JSendSuccessSchema(z.object({})),
					[HttpStatus.CONFLICT]: JSendErrorSchema(),
				},
				tags,
				description: 'Create a new user',
			},
		},
		async (request, reply) => {
			const user = request.body;

			const existingUser = await UserQueries.getUserByEmail(user.email);
			if (existingUser) {
				return reply.status(HttpStatus.CONFLICT).send(JSend.error('User already exists.'));
			}

			const hashedPassword = await Password.hash(user.password);

			await UserQueries.createUser({ ...user, password: hashedPassword });
			return reply.status(HttpStatus.CREATED).send(JSend.success({}, 'User created succesfully.'));
		}
	);
}
