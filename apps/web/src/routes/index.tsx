import type { paths } from '@repo/open-api/schema';
import { createFileRoute } from '@tanstack/react-router';
import createClient from 'openapi-fetch';

export const Route = createFileRoute('/')({
	component: App,
	errorComponent: ({ error }) => {
		return <div className="p">{error.message}</div>;
	},
});

async function App() {
	const client = createClient<paths>({ baseUrl: 'http://localhost:3000/' });
	const { data, error } = await client.GET('/users');

	if (error) {
		throw new Error('Failed to fetch users');
	}

	return (
		<div className="hello">
			{data?.payload.map((user) => (
				<div key={user.name}>
					<h2>{user.name}</h2>
					<p>{user.age}</p>
				</div>
			))}
		</div>
	);
}
