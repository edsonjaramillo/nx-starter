import { userRouter } from './routes/users/users-index';
import { createApp } from './utils/hono-utils';
import { configureOpenAPI } from './utils/open-api-utils';

const app = createApp();

configureOpenAPI(app);

const routers = [userRouter] as const;

routers.forEach((router) => {
	app.route('/', router);
});

export { app };
