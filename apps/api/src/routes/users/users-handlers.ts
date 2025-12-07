import type { AppRouteHandler } from '../../utils/open-api-types';
import type { UserCreateRoute, UserListRoute } from './users-routes';
import { JSend } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';
import { UserQueries } from '../../db/queries/user-queries';

export class UserHandlers {
	static list: AppRouteHandler<UserListRoute> = async (c) => {
		const users = await UserQueries.getUsers();
		return c.json(JSend.success(users, 'Succesfully got users.'), HttpStatus.OK);
	};

	static create: AppRouteHandler<UserCreateRoute> = async (c) => {
		const user = c.req.valid('json');

		const existingUser = await UserQueries.getUserByEmail(user.email);
		if (existingUser) {
			return c.json(JSend.error('User already exists.'), HttpStatus.CONFLICT);
		}

		await UserQueries.createUser(user);
		return c.json(
			JSend.success({ hello: 'helo' }, 'User created succesfully.'),
			HttpStatus.CREATED
		);
	};
}
