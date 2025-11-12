import type { paths } from '@repo/open-api/schema';
import { createFileRoute } from '@tanstack/react-router';
import createClient from 'openapi-fetch';

export const Route = createFileRoute('/')({
	component: App,
	loader: async () => {
		const client = createClient<paths>({ baseUrl: 'http://localhost:8080/' });
		const { data, error, response } = await client.GET('/users');
		const { statusText } = response;
		if (error || !data) {
			throw new Error(statusText);
		}
		return data.payload;
	},
});

function App() {
	const users = Route.useLoaderData();

	return (
		<div className="hello">
			{users.map((user) => (
				<div key={user.name}>
					<h2>{user.name}</h2>
					<p>{user.age}</p>
				</div>
			))}
		</div>
	);
}
