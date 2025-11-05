/**
 * I
 * @type {import('@antfu/eslint-config').OptionsConfig}
 */
export const base = {
	typescript: true,
	pnpm: true,
	stylistic: {
		indent: 'tab',
		semi: true,
	},
	rules: {
		'jsonc/sort-keys': ['off'],
		'style/quote-props': ['off'],
		indent: ['off'],
	},
};
