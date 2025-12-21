import type { FastifyReply, FastifyRequest } from 'fastify';
import { JSend } from '@repo/http/jsend';
import { zString } from '@repo/validation/core';
import { z } from 'zod';

export interface Pagination {
	page: number;
	limit: number;
	offset: number;
}

const DEFAULT_LIMIT = 25;
const DEFAULT_PAGE = 1;
const positiveNonZeroInteger = /^[1-9]\d*$/;

const nonZeroSchema = zString
	.regex(positiveNonZeroInteger, { message: 'Must be a positive non-zero integer' })
	.transform((n) => Number.parseInt(n));

export const paginationSchema = z.object({
	limit: nonZeroSchema.default(DEFAULT_LIMIT).meta({
		description: 'Limit the number of items returned. Must be positive non-zero integer.',
	}),
	page: nonZeroSchema.default(DEFAULT_PAGE).meta({
		description: 'The page number to return. Must be positive non-zero integer.',
	}),
});

type ParsedQuery = z.infer<typeof paginationSchema>;

declare module 'fastify' {
	interface FastifyRequest {
		pagination: Pagination;
	}
}

export function paginate(request: FastifyRequest, reply: FastifyReply, next: () => void) {
	const query = request.query as ParsedQuery;
	if (query.limit === undefined || query.page === undefined) {
		return reply.status(400).send(JSend.error('Incorrect pagination parameters supplied.'));
	}

	const normalizedPage = Math.max(query.page, 1);
	const offset = (normalizedPage - 1) * query.limit;

	request.pagination = { page: query.page, limit: query.limit, offset };
	next();
}
