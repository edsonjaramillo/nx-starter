/**
 * @type {import("tsdown").Options}
 */
export const baseConfig = {
	outDir: 'dist',
	format: 'esm',
	target: 'es2022',
	outExtension: () => ({ js: '.mjs' }),
};

/**
 * @type {import("tsdown").Options}
 */
export const prepareConfig = {
	...baseConfig,
	clean: true,
	dts: true,
	treeshake: false,
};

/**
 * @type {import("tsdown").Options}
 */
export const productionConfig = {
	...baseConfig,
	clean: true,
	minify: true,
	treeshake: true,
};

/**
 * @type {import("tsdown").Options}
 */
export const developmentConfig = {
	...baseConfig,
	watch: true,
	dts: {
		sourcemap: false,
	},
	treeshake: false,
};
