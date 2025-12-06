import { z } from 'zod/v4';

export const zNodeEnv = z.enum(['development', 'production']);

export const zCoerceNumber = z.coerce.number();

export const zString = z.string();
