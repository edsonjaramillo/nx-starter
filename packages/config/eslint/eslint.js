import antfu from '@antfu/eslint-config';

/**
 * @typedef {{react: boolean, extraRules: Record<string, any>}} EslintConfigOptions
/**
 * @param {!appType} type
 * @param {} extraRules Extra rules to add to the config
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
			'antfu/consistent-list-newline': ['off'],
			'jsonc/sort-keys': ['off'],
			'style/arrow-parens': ['off'],
			'style/brace-style': ['off'],
			'style/comma-dangle': ['off'],
			'style/jsx-closing-bracket-location': ['off'],
			'style/operator-linebreak': ['off'],
			'style/quote-props': ['off'],
			indent: ['off'],
			...opts?.extraRules,
		},
		ignores: ['**/*/routeTree.gen.ts'],
	});
}
