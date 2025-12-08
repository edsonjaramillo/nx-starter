import { z } from '@hono/zod-openapi';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createdAt, id, omitInsertColumns, updatedAt } from './shared';

export const usersTable = pgTable('users', {
	id,
	createdAt,
	updatedAt,
	name: text().notNull(),
	email: text().notNull().unique(),
});

export const userColumns = {
	id: true,
	name: true,
	email: true,
} as const;

export const selectUserSchema = createSelectSchema(usersTable).pick(userColumns);

export const createUserSchema = createInsertSchema(usersTable, {
	email: z.email(),
})
	.omit(omitInsertColumns)
	.openapi({ example: { name: 'John Doe', email: 'johdoe@me.com' } });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
