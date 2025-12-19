import process from 'node:process';
import { db } from '../database-client';
import { UserQueries } from '../queries/user-queries';
import { usersTable } from '../schema/users-schema';

const names = [
	'Tony Stark',
	'Steve Rogers',
	'Bruce Banner',
	'Natasha Romanoff',
	'Clint Barton',
	'Thor Odinson',
	'Wanda Maximoff',
	'Peter Parker',
	'Stephen Strange',
	'Eddie Brock',
	'Peter Quill',
];

async function seed() {
	// delete all existing users
	await db.delete(usersTable);

	// create new users
	for (const name of names) {
		const [firstName, lastName] = name.toLowerCase().split(' ');
		const email = `${firstName}.${lastName}@example.com`;
		await UserQueries.createUser({
			name,
			email,
			password: 'abcd1234',
		});
	}
}

seed()
	.catch(console.error)
	.finally(() => process.exit());
