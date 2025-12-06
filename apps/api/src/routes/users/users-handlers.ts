import type { AppRouteHandler } from '../../utils/open-api-types';
import type { UserCreateRoute, UserListRoute } from './users-routes';
import { HttpStatus } from '@repo/http/status-codes';

export class UserHandlers {
	static list: AppRouteHandler<UserListRoute> = async (c) => {
		return c.json([], HttpStatus.OK);
	};

	static create: AppRouteHandler<UserCreateRoute> = async (c) => {
		return c.json({}, HttpStatus.CREATED);
	};
}
