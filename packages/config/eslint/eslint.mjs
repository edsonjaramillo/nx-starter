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
		indent: ['off'],
		'jsonc/sort-keys': ['off'],
	},
};
