import type { AppRouteHandler } from '../../utils/open-api-types';
import type { UserListRoute } from './users-routes';
import { JSend } from '@repo/http/jsend';
import { HttpStatus } from '@repo/http/status-codes';

export class UserHandlers {
	static list: AppRouteHandler<UserListRoute> = async (c) => {
		return c.json(
			JSend.success([{ name: 'Tim', age: 3 }], 'User Found'),
			HttpStatus.OK
		);
	};
}
