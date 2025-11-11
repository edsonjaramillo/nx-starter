import antfu from '@antfu/eslint-config';

/**
 * @typedef {{react: boolean}} EslintConfigOptions
 */

/**
 * @param {!appType} type
 * @param {EslintConfigOptions} [opts]
 */
export function createEslintConfig(type, opts) {
	return antfu({
		type,
		typescript: true,
		pnpm: true,
		react: opts?.react || false,
		stylistic: {
			indent: 'tab',
			semi: true,
		},
		rules: {
			'jsonc/sort-keys': ['off'],
			'style/arrow-parens': ['off'],
			'style/comma-dangle': ['off'],
			'style/quote-props': ['off'],
			indent: ['off'],
		},
	});
}
