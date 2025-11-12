import process from 'node:process';
import { zCoerceNumber, zNodeEnv } from '@repo/validation/core';
import { parseEnv } from '@repo/validation/helpers';
import { z } from 'zod';

const WebEnvSchema = z.object({
	NODE_ENV: zNodeEnv,
	WEB_PORT: zCoerceNumber,
});

export type WebEnv = z.infer<typeof WebEnvSchema>;

export const env = parseEnv(WebEnvSchema, process.env);
