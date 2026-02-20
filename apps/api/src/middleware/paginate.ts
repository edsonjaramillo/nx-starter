import { paginationSchema } from '@repo/validation/schemas';

export interface Pagination {
	page: number;
	limit: number;
	offset: number;
}

const DEFAULT_LIMIT = 25;
const DEFAULT_PAGE = 1;

export function toPagination(query: unknown): Pagination {
	const parsedQuery = paginationSchema.parse(query);
	const page = parsedQuery.page ? Number.parseInt(parsedQuery.page) : DEFAULT_PAGE;
	const limit = parsedQuery.limit ? Number.parseInt(parsedQuery.limit) : DEFAULT_LIMIT;

	return { page, limit, offset: (page - 1) * limit };
}

export function parsePagination({ query }: { query: unknown }): { pagination: Pagination } {
	return { pagination: toPagination(query) };
}
