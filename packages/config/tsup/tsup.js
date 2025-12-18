import { defineConfig } from 'tsup';

/**
 * @type {import('tsup').Options}
 */
const baseConfig = {
	format: ['cjs', 'esm'],
	outDir: 'dist',
	target: 'es2022',
	clean: true,
	minify: false,
	splitting: true,
	treeshake: true,
	dts: {
		sourcemap: false,
	},
};

/**
 * @type {import('tsup').Options}
 */
const preloadConfig = {
	...baseConfig,
};

/**
 * @type {import('tsup').Options}
 */
const productionConfig = {
	...baseConfig,
	dts: false,
	minify: true,
};

/**
 * @type {import('tsup').Options}
 */
const developmentConfig = {
	...baseConfig,
	clean: false,
	watch: true,
};

/**
 * @typedef {import('tsup').UserConfigFn} UserConfigFn
 */

/**
 * @param {string | string[]} entry
 * @returns {UserConfigFn} returns a tsup config function
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
			case 'preload':
				return {
					entry,
					...preloadConfig,
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
