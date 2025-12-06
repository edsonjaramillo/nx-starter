import type {
	OpenAPIHono,
	RouteConfig,
	RouteHandler,
	z,
} from '@hono/zod-openapi';
import type { Schema } from 'hono';

export type ZodSchema = z.ZodTypeAny;

export interface AppBindings {
	// Variables: {
	// 	logger: con
	// };
}

// eslint-disable-next-line ts/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;
