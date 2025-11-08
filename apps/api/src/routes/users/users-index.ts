import { createRouter } from '../../utils/hono-utils';
import { userHandlers } from './users-handlers';
import { userRoutes } from './users-routes';

export const userRouter = createRouter().openapi(
	userRoutes.list,
	userHandlers.list
);
