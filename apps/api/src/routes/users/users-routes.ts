import { createRoute } from '@hono/zod-openapi';
import { JSendSuccessSchema } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { z } from 'zod';
import { jsonContent } from '../../utils/open-api-utils';

const tags = ['Users'];

const UserSchema = z.object({
	name: z.string(),
	age: z.number(),
});

export class UserRoutes {
	static list = createRoute({
		path: '/users',
		method: 'get',
		tags,
		responses: {
			[HttpStatus.OK]: jsonContent(
				JSendSuccessSchema(z.array(UserSchema)),
				'Users is good'
			),
		},
	});
}

export type UserListRoute = typeof UserRoutes.list;
