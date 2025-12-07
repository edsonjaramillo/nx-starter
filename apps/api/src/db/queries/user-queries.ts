import type { CreateUserSchema } from '../schema/users-schema';
import { db } from '../database-client';
import { userColumns, usersTable } from '../schema/users-schema';

export class UserQueries {
	static async getUsers() {
		const users = await db.query.usersTable.findMany({ columns: userColumns });
		return users;
	}

	static async getUserByEmail(email: string) {
		const user = await db.query.usersTable.findFirst({
			where: { email },
			columns: { email: true },
		});

		return user;
	}

	static async createUser(user: CreateUserSchema) {
		await db.insert(usersTable).values(user);
	}
}
