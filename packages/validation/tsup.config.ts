import { createConfig } from '@repo/config/tsup';

const entry = ['src/core.ts', 'src/helpers.ts'];

export default createConfig(entry);
