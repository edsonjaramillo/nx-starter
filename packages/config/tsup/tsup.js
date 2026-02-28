import fs from 'node:fs';
import path from 'node:path';
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
 * @param {string | string[] | undefined} entry
 * @returns {string[]}
 */
function toEntryList(entry) {
	if (!entry) {
		return [];
	}

	return Array.isArray(entry) ? entry : [entry];
}

/**
 * @param {string} filePath
 * @returns {string}
 */
function toPosixPath(filePath) {
	return filePath.replaceAll('\\', '/');
}

/**
 * @param {string} entryPath
 * @returns {string}
 */
function entryToBaseName(entryPath) {
	let normalized = toPosixPath(entryPath).replace(/^\.\/+/, '');
	normalized = normalized.replace(/^src\//, '');
	normalized = normalized.replace(/\.(tsx?|jsx?|mts|cts)$/, '');
	return normalized;
}

/**
 * @param {string} entryPath
 * @returns {string}
 */
function entryToExportKey(entryPath) {
	return `./${entryToBaseName(entryPath)}`;
}

/**
 * @param {string} baseName
 * @returns {Record<string, string>}
 */
function buildManagedExport(baseName) {
	return {
		types: `./dist/${baseName}.d.ts`,
		import: `./dist/${baseName}.js`,
		require: `./dist/${baseName}.cjs`,
	};
}

/**
 * @param {string[]} entryList
 */
function syncExportsForPreload(entryList) {
	if (entryList.length === 0) {
		return;
	}

	const packageJsonPath = path.join(process.cwd(), 'package.json');
	if (!fs.existsSync(packageJsonPath)) {
		console.warn('Skipping preload export sync: package.json not found');
		return;
	}

	let packageJson;
	try {
		packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
	} catch (error) {
		console.warn('Skipping preload export sync: failed to parse package.json');
		console.warn(error);
		return;
	}

	const existingExports = packageJson.exports;
	if (!existingExports || typeof existingExports !== 'object' || Array.isArray(existingExports)) {
		console.warn('Skipping preload export sync: package.json has no object "exports" field');
		return;
	}

	const managedKeys = entryList.map(entryToExportKey);
	const managedEntries = entryList.map((entryPath) => {
		const baseName = entryToBaseName(entryPath);
		return [entryToExportKey(entryPath), buildManagedExport(baseName)];
	});

	const existingExportEntries = Object.entries(existingExports);
	const firstManagedIndex = existingExportEntries.findIndex(([key]) => managedKeys.includes(key));
	const unmanagedEntries = existingExportEntries.filter(([key]) => !managedKeys.includes(key));

	const nextExportEntries =
		firstManagedIndex >= 0
			? [
					...unmanagedEntries.slice(0, firstManagedIndex),
					...managedEntries,
					...unmanagedEntries.slice(firstManagedIndex),
				]
			: [...unmanagedEntries, ...managedEntries];

	const nextExports = Object.fromEntries(nextExportEntries);
	const currentExportsJson = JSON.stringify(existingExports);
	const nextExportsJson = JSON.stringify(nextExports);

	if (currentExportsJson === nextExportsJson) {
		return;
	}

	packageJson.exports = nextExports;
	fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, '\t')}\n`);
	console.warn('Synchronized package.json exports for preload entries');
}

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
		const entryList = toEntryList(entry);
		switch (options.env.CONFIG) {
			case 'production':
				return {
					entry,
					...productionConfig,
				};
			case 'preload':
				syncExportsForPreload(entryList);
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
