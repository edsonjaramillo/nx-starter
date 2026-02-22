import { fileURLToPath } from 'node:url';

const commonPlugins = ['prettier-plugin-packagejson', '@ianvs/prettier-plugin-sort-imports'];
const tailwindStylesheet = fileURLToPath(new URL('../../ui/tailwind/theme.css', import.meta.url));

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const base = {
	printWidth: 100,
	useTabs: true,
	semi: true,
	singleQuote: true,
	bracketSameLine: true,
	trailingComma: 'es5',
	plugins: commonPlugins,
	importOrder: [
		'<TYPES>^(node:)',
		'<TYPES>',
		'<TYPES>^[.]',
		'<THIRD_PARTY_MODULES>',
		'^[./]',
		'^(?!.*[.]css$)[./].*$',
		'.css$',
	],
};

export const reactLibraryConfig = {
	...base,
	plugins: [...commonPlugins, 'prettier-plugin-tailwindcss'],
	tailwindStylesheet,
	tailwindFunctions: ['cn', 'cva'],
};

export const libraryConfig = { ...base };
