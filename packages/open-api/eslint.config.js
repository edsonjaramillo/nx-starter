import { createEslintConfig } from '@repo/config/eslint';

export default createEslintConfig('lib', {
	extraRules: { 'ts/explicit-function-return-type': ['off'] },
});
