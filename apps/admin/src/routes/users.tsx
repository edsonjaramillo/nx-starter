import { paginationSchema } from '@repo/validation/schemas';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { adminAPIClient } from '../lib/admin-api-client';

export const Route = createFileRoute('/users')({
	component: RouteComponent,
	validateSearch: zodValidator(paginationSchema),
	loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
	loader: async ({ deps: { page, limit } }) => {
		return adminAPIClient.getUsers({ page, limit });
	},
	errorComponent: function () {
		return <p>Failed to load users.</p>;
	},
	onError: () => redirect({ to: '/' }),
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
