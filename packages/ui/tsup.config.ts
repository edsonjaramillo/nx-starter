import { createConfig } from '@repo/config/tsup';

const entry = [
	'./src/button.tsx',
	'./src/form.tsx',
	'./src/input.tsx',
	'./src/responsive.tsx',
	'./src/text.tsx',
];

export default createConfig(entry);
