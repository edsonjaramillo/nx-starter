import process from 'node:process';
import { z } from 'zod';

const EnvSchema = z.object({
	NODE_ENV: z.string().default('development'),
	PORT: z.coerce.number().default(9999),
});

export type Env = z.infer<typeof EnvSchema>;

const result = EnvSchema.safeParse(process.env);

if (result.error) {
	console.error('❌ Invalid env:');
	console.error(JSON.stringify(z.treeifyError(result.error), null, 2));
	process.exit(1);
}

export const env = result.data;
