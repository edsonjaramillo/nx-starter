/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const base = {
	plugins: [
		'prettier-plugin-packagejson',
		'@trivago/prettier-plugin-sort-imports',
	],
	trailingComma: 'es5',
	semi: true,
	useTabs: true,
	singleQuote: true,
	importOrderSortSpecifiers: true,
	importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
};

export const libraryConfig = { ...base };
