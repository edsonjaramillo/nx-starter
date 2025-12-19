import type { z } from '@hono/zod-openapi';
import { zEmail, zPassword } from '@repo/validation/core';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createdAt, id, omitInsertColumns, updatedAt } from './shared';

export const usersTable = pgTable('users', {
	id,
	createdAt,
	updatedAt,
	name: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
});

export const userColumns = {
	id: true,
	name: true,
	email: true,
} as const;

export const selectUserSchema = createSelectSchema(usersTable).pick(userColumns);

export const createUserSchema = createInsertSchema(usersTable, {
	email: zEmail,
	password: zPassword,
})
	.omit(omitInsertColumns)
	.openapi({
		example: {
			name: 'Tony Stark',
			email: 'tony.stark@example.com',
			password: 'abcd1234',
		},
	});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
