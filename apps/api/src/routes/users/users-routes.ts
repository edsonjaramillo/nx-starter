import { createRoute } from '@hono/zod-openapi';
import { HttpStatus } from '@repo/http/status-codes';
import { z } from 'zod/v4';
import { jsonContent, jsonContentRequired } from '../../utils/open-api-utils';

const tags = ['Users'];

export class UserRoutes {
	static list = createRoute({
		path: '/users',
		method: 'get',
		tags,
		responses: {
			[HttpStatus.OK]: jsonContent(z.object(), 'Users is good'),
		},
	});

	static create = createRoute({
		path: '/users',
		method: 'post',
		tags,
		request: {
			body: jsonContentRequired(z.object(), 'Insert User'),
		},
		responses: {
			[HttpStatus.CREATED]: jsonContent(z.object(), 'Create User is good'),
		},
	});
}

export type UserListRoute = typeof UserRoutes.list;
export type UserCreateRoute = typeof UserRoutes.create;
