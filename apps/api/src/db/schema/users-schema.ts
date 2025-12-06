import { pgTable, text } from 'drizzle-orm/pg-core';
import { z } from 'zod/v4';
import { createdAt, id, updatedAt } from './shared';

export const usersTable = pgTable('users', {
	id,
	createdAt,
	updatedAt,
	name: text().notNull(),
	email: text().notNull().unique(),
});
