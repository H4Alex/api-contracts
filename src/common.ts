import { z } from 'zod';

// ─── Primitives ──────────────────────────────────────────

export const isoTimestampSchema = z
  .string()
  .datetime({ offset: true })
  .or(z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/));

export const monetarioSchema = z.number().nonnegative();

// ─── Hypermedia ──────────────────────────────────────────

export const hypermediaLinkSchema = z.object({
  href: z.string(),
  method: z.string().optional(),
  rel: z.string().optional(),
});

export const hypermediaLinksSchema = z.record(z.string(), hypermediaLinkSchema);

// ─── Pagination ──────────────────────────────────────────

export const paginationMetaSchema = z.object({
  current_page: z.number().int().nonnegative(),
  last_page: z.number().int().nonnegative(),
  per_page: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  from: z.number().int().nullable().optional(),
  to: z.number().int().nullable().optional(),
});

export const cursorPaginationMetaSchema = z.object({
  next_cursor: z.string().nullable().optional(),
  prev_cursor: z.string().nullable().optional(),
  per_page: z.number().int().positive(),
});

export const paginationLinksSchema = z.object({
  first: z.string().nullable().optional(),
  last: z.string().nullable().optional(),
  prev: z.string().nullable().optional(),
  next: z.string().nullable().optional(),
});

// ─── Errors ──────────────────────────────────────────────

export const apiErrorDetailSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
});

export const apiErrorResponseSchema = z.object({
  status: z.literal(false),
  data: z.null().optional(),
  error: apiErrorDetailSchema.or(z.string()).or(z.record(z.string(), z.unknown())),
  message: z.string().optional(),
});

export const laravelValidationErrorSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())),
});

// ─── Envelopes (generic) ─────────────────────────────────

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.literal(true),
    data: dataSchema,
    error: z.null().optional(),
    message: z.string().optional(),
  });

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    status: z.literal(true),
    data: z.array(itemSchema),
    pagination: paginationMetaSchema,
    links: paginationLinksSchema.optional(),
    message: z.string().optional(),
  });

export const deleteSuccessResponseSchema = z.object({
  status: z.literal(true),
  data: z.null().optional(),
  message: z.string().optional(),
});

// ─── Requests ────────────────────────────────────────────

export const listRequestSchema = z.object({
  page: z.number().int().positive().optional(),
  per_page: z.number().int().positive().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
});

export const verifyResetTokenRequestSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
});

export const verifyResetTokenResponseSchema = z.object({
  valid: z.boolean(),
  message: z.string().optional(),
});

// ─── Inferred types ──────────────────────────────────────

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type CursorPaginationMeta = z.infer<typeof cursorPaginationMetaSchema>;
export type PaginationLinks = z.infer<typeof paginationLinksSchema>;
export type ApiErrorDetail = z.infer<typeof apiErrorDetailSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
export type LaravelValidationError = z.infer<typeof laravelValidationErrorSchema>;
export type DeleteSuccessResponse = z.infer<typeof deleteSuccessResponseSchema>;
export type ListRequest = z.infer<typeof listRequestSchema>;
export type VerifyResetTokenRequest = z.infer<typeof verifyResetTokenRequestSchema>;
export type VerifyResetTokenResponse = z.infer<typeof verifyResetTokenResponseSchema>;
