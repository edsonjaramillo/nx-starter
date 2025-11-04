import { defineConfig } from 'tsdown';

/**
 * @type {import('tsdown').Options}
 */
const baseConfig = {
	outDir: 'dist',
	format: 'esm',
	target: 'es2022',
};

/**
 * @type {import('tsdown').Options}
 */
const prepareConfig = {
	...baseConfig,
	clean: true,
	dts: {
		sourcemap: false,
	},
	treeshake: false,
};

/**
 * @type {import('tsdown').Options}
 */
const productionConfig = {
	...baseConfig,
	clean: true,
	minify: true,
	treeshake: true,
};

/**
 * @type {import('tsdown').Options}
 */
const developmentConfig = {
	...baseConfig,
	watch: true,
	dts: {
		sourcemap: false,
	},
	treeshake: false,
};

/**
 * @typedef {import('tsdown').UserConfigFn} UserConfigFn
 */

/**
 * @param {string | string[]} entry
 * @returns {UserConfigFn} returns a tsdown config function
 */
export function createConfig(entry) {
	return defineConfig((options) => {
		if (!options.env || !options.env.CONFIG) {
			throw new Error('Invalid Config');
		}

		console.warn('Building with CONFIG:', options.env.CONFIG);
		switch (options.env.CONFIG) {
			case 'production':
				return {
					entry,
					...productionConfig,
				};
			case 'prepare':
				return {
					entry,
					...prepareConfig,
				};
			case 'development':
				return {
					entry,
					...developmentConfig,
				};
			default:
				throw new Error(`Unknown CONFIG: ${options.env.CONFIG}`);
		}
	});
}
