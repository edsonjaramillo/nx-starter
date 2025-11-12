import { z } from 'zod';

export const zNodeEnv = z.enum(['development', 'production']);

export const zCoerceNumber = z.coerce.number();
