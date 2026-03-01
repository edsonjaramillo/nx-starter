import type { PaginationSchema } from '@repo/validation/schemas';
import type { paths } from '../openapi-api-schema.d.ts';
import createClient from 'openapi-fetch';

export class APIClient {
	private client;
	constructor(public baseUrl: string) {
		this.client = createClient<paths>({ baseUrl });
	}

	async getUsers(pagination: PaginationSchema) {
		const { data, error, response } = await this.client.GET('/users/', {
			params: { query: { limit: pagination.limit, page: pagination.page } },
		});

		const { statusText } = response;
		if (error) {
			throw new Error(statusText);
		}

		return data.payload;
	}
}
