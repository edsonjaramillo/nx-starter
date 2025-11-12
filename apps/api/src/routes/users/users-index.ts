import { createRouter } from '../../utils/hono-utils';
import { UserHandlers } from './users-handlers';
import { UserRoutes } from './users-routes';

export const userRouter = createRouter().openapi(
	UserRoutes.list,
	UserHandlers.list
);
