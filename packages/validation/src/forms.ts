import { z } from 'zod';
import { zEmail, zName, zPassword } from './core';

export const signInFormSchema = z.object({
	name: zName,
	email: zEmail,
	password: zPassword,
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
