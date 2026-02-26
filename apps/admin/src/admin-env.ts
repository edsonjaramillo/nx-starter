import process from 'node:process';
import { zCoerceNumber, zNodeEnv } from '@repo/validation/core';
import { parseEnv } from '@repo/validation/helpers';
import { z } from 'zod';

const AdminEnvSchema = z.object({
	NODE_ENV: zNodeEnv,
	ADMIN_PORT: zCoerceNumber,
});

export type AdminEnv = z.infer<typeof AdminEnvSchema>;

export const adminEnv = parseEnv(AdminEnvSchema, process.env);
