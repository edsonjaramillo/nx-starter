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
	plugins: ['prettier-plugin-packagejson', '@ianvs/prettier-plugin-sort-imports'],
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

export const libraryConfig = { ...base };
