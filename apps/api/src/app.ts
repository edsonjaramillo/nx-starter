import { userRouter } from './routes/users/users-index';
import configureOpenAPI, { createApp } from './utils/open-api-utils';

const app = createApp();

configureOpenAPI(app);

const routers = [userRouter] as const;

routers.forEach((router) => {
	app.route('/', router);
});

export { app };
