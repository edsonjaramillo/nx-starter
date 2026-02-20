import type { paths } from '@repo/open-api/schema';
import { paginationSchema } from '@repo/validation/schemas';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import createClient from 'openapi-fetch';

export const Route = createFileRoute('/users')({
	component: RouteComponent,
	validateSearch: zodValidator(paginationSchema),
	loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
	loader: async ({ deps: { page, limit } }) => {
		const client = createClient<paths>({ baseUrl: 'http://localhost:8080/' });
		const { data, error, response } = await client.GET('/users/', {
			params: { query: { page, limit } },
		});

		const { statusText } = response;
		if (error) {
			throw new Error(statusText);
		}

		return data.payload;
	},
});

function RouteComponent() {
	const users = Route.useLoaderData();

	return (
		<div className="hello">
			{users.map((user) => (
				<div key={user.name}>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
				</div>
			))}
		</div>
	);
}
