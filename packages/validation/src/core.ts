import { z } from 'zod';

export const zNodeEnv = z.enum(['development', 'production']);
export const zCoerceNumber = z.coerce.number();
export const zString = z.string();
export const zEmail = z.email();
export const zPassword = z.string().min(8).max(64);
