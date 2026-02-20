import { JSend, JSendErrorSchema, JSendSuccessSchema } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { Elysia } from 'elysia';
import { z } from 'zod';
import { UserQueries } from '../../db/queries/user-queries';
import { insertUserSchema, selectUserSchema } from '../../db/schema/users-schema';
import { paginationSchema, parsePagination } from '../../middleware/paginate';
import { Password } from '../../utils/password';

const tags = ['Users'];

const paginatedUsersRouter = new Elysia().resolve(parsePagination).get(
	'/',
	async ({ pagination, set }) => {
		const users = await UserQueries.getUsers(pagination);
		set.status = HttpStatus.OK;
		return JSend.success(users, 'Got users');
	},
	{
		query: paginationSchema,
		response: {
			[HttpStatus.OK]: JSendSuccessSchema(z.array(selectUserSchema)),
			[HttpStatus.BAD_REQUEST]: JSendErrorSchema(),
		},
		detail: {
			tags,
			description: 'Get a list of users',
		},
	}
);

export const userRouter = new Elysia({ prefix: '/users' }).use(paginatedUsersRouter).post(
	'/',
	async ({ body, set }) => {
		const parsedBody = insertUserSchema.safeParse(body);
		if (!parsedBody.success) {
			set.status = HttpStatus.BAD_REQUEST;
			return JSend.error('Invalid user payload.');
		}

		const user = parsedBody.data;
		const existingUser = await UserQueries.getUserByEmail(user.email);
		if (existingUser) {
			set.status = HttpStatus.CONFLICT;
			return JSend.error('User already exists.');
		}

		const hashedPassword = await Password.hash(user.password);
		await UserQueries.createUser({ ...user, password: hashedPassword });

		set.status = HttpStatus.CREATED;
		return JSend.success({}, 'User created succesfully.');
	},
	{
		body: insertUserSchema,
		response: {
			[HttpStatus.CREATED]: JSendSuccessSchema(z.object({})),
			[HttpStatus.BAD_REQUEST]: JSendErrorSchema(),
			[HttpStatus.CONFLICT]: JSendErrorSchema(),
		},
		detail: {
			tags,
			description: 'Create a new user',
		},
	}
);
