import antfu from '@antfu/eslint-config';
import { base } from '@repo/config/eslint';

export default antfu({
	...base,
	type: 'lib',
});
