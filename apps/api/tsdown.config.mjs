import { developmentConfig, productionConfig } from '@repo/config/tsdown';
import { defineConfig } from 'tsdown';

const entry = ['src/server.ts'];

export default defineConfig((options) => {
	console.warn('Building with CONFIG:', options.env.CONFIG);
	switch (options.env.CONFIG) {
		case 'production':
			return {
				entry,
				...productionConfig,
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
