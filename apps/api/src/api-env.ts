import process from 'node:process';
import { zCoerceNumber, zNodeEnv, zString } from '@repo/validation/core';
import { parseEnv } from '@repo/validation/helpers';
import { z } from 'zod/v4';

const ApiEnvSchema = z.object({
	NODE_ENV: zNodeEnv,
	API_PORT: zCoerceNumber,
	DATABASE_USER: zString,
	DATABASE_PASSWORD: zString,
	DATABASE_HOST: zString,
	DATABASE_PORT: zCoerceNumber,
	DATABASE_NAME: zString,
});

export type ApiEnv = z.infer<typeof ApiEnvSchema>;

export const apiEnv = parseEnv(ApiEnvSchema, process.env);
