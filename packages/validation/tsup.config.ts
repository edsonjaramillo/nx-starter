import { createConfig } from '@repo/config/tsup';

const entry = ['src/core.ts', 'src/helpers.ts', 'src/schemas.ts', 'src/forms.ts'];

export default createConfig(entry);
