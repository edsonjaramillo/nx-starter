import { createRoute, z } from '@hono/zod-openapi';
import { JSendErrorSchema, JSendSuccessSchema } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { createUserSchema, selectUserSchema } from '../../db/schema/users-schema';
import { jsonContent, jsonContentRequired } from '../../utils/open-api-utils';

const tags = ['Users'];

export class UserRoutes {
	static list = createRoute({
		path: '/users',
		method: 'get',
		tags,
		responses: {
			[HttpStatus.OK]: jsonContent(JSendSuccessSchema(z.array(selectUserSchema)), 'Get users'),
		},
	});

	static create = createRoute({
		path: '/users',
		method: 'post',
		tags,
		request: {
			body: jsonContentRequired(createUserSchema, 'Insert user schema'),
		},
		responses: {
			[HttpStatus.CONFLICT]: jsonContent(JSendErrorSchema(), 'User already exists'),
			[HttpStatus.CREATED]: jsonContent(
				JSendSuccessSchema(z.object()),
				'Create user is successful'
			),
		},
	});
}

export type UserListRoute = typeof UserRoutes.list;
export type UserCreateRoute = typeof UserRoutes.create;
