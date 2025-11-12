import process from 'node:process';
import { zCoerceNumber, zNodeEnv } from '@repo/validation/core';
import { z } from 'zod';

const ApiEnvSchema = z.object({
	NODE_ENV: zNodeEnv,
	API_PORT: zCoerceNumber,
});

export type ApiEnv = z.infer<typeof ApiEnvSchema>;

const result = ApiEnvSchema.safeParse(process.env);

if (result.error) {
	console.error(JSON.stringify(z.treeifyError(result.error), null, 2));
	process.exit(1);
}

export const env = result.data;
