import { defineRelations } from 'drizzle-orm';
import { usersTable } from './users-schema';

export const relations = defineRelations({ usersTable });
