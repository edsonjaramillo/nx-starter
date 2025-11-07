import { createRouter } from '../../utils/open-api-utils';
import { userHandlers } from './users-handlers';
import { userRoutes } from './users-routes';

export const userRouter = createRouter().openapi(
	userRoutes.list,
	userHandlers.list
);
