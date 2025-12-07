/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const base = {
	plugins: [
		'prettier-plugin-packagejson',
		'@ianvs/prettier-plugin-sort-imports',
	],
	trailingComma: 'es5',
	printWidth: 100,
	semi: true,
	useTabs: true,
	singleQuote: true,
	importOrderSortSpecifiers: true,
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
