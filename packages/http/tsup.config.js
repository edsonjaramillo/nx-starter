import { createConfig } from '@repo/config/tsup';

const entry = ['src/jsend.ts', 'src/status-codes.ts'];

export default createConfig(entry);
