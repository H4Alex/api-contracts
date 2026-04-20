/**
 * Entity schemas. Initial release uses permissive shapes (passthrough) — only
 * key identifiers are required and most fields accept any string to avoid
 * false-negative validations while the canonical enum values are collected
 * from real API responses. Harden incrementally in follow-up minor bumps.
 */
import { z } from 'zod';
import { isoTimestampSchema } from './common.js';

// ─── Empresa & Usuários ──────────────────────────────────

export const empresaRefSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    slug: z.string().nullish(),
    perfil: z.string().nullish(),
  })
  .passthrough();

export const empresaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    cnpj: z.string().nullish(),
    status: z.string().nullish(),
    created_at: isoTimestampSchema.nullish(),
  })
  .passthrough();

export const usuarioSchema = z
  .object({
    id: z.number().int().or(z.string()).nullish(),
    nome: z.string().nullish(),
    email: z.string().email().nullish(),
    tipo_global: z.string().nullish(),
  })
  .passthrough();

export const usuarioInternoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    email: z.string().email().nullish(),
    perfil: z.string().nullish(),
  })
  .passthrough();

export const unidadeNegocioSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    status: z.string().nullish(),
  })
  .passthrough();

// ─── Clientes ────────────────────────────────────────────

export const clienteSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    cpf: z.string().nullish(),
    email: z.string().email().nullish(),
    telefone: z.string().nullish(),
  })
  .passthrough();

export const clienteSaldoSchema = z
  .object({
    cliente_id: z.number().int().or(z.string()).nullish(),
    saldo_disponivel: z.number().nullish(),
    saldo_bloqueado: z.number().nullish(),
    saldo_pendente: z.number().nullish(),
  })
  .passthrough();

// ─── Campanhas ───────────────────────────────────────────

export const campanhaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    status: z.string().nullish(),
    percentual_cashback: z.number().nullish(),
    inicio: isoTimestampSchema.nullable().nullish(),
    fim: isoTimestampSchema.nullable().nullish(),
  })
  .passthrough();

// ─── Transações / Cashback ───────────────────────────────

export const transacaoBaseSchema = z
  .object({
    id: z.number().int().or(z.string()),
    cliente_id: z.number().int().or(z.string()).nullish(),
    valor: z.number().nullish(),
    status: z.string().nullish(),
    created_at: isoTimestampSchema.nullish(),
  })
  .passthrough();

export const transacaoSchema = transacaoBaseSchema;

// ─── Assinatura & Billing ────────────────────────────────

export const planoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().nullish(),
    ciclo: z.string().nullish(),
    preco: z.number().nullish(),
    nivel_relatorio: z.string().nullish(),
    nivel_suporte: z.string().nullish(),
  })
  .passthrough();

export const assinaturaSchema = z
  .object({
    id: z.number().int().or(z.string()).nullish(),
    plano_id: z.number().int().or(z.string()).nullish(),
    status: z.string().nullish(),
    ciclo: z.string().nullish(),
    started_at: isoTimestampSchema.nullish(),
    expires_at: isoTimestampSchema.nullable().nullish(),
  })
  .passthrough();

export const faturaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    valor: z.number().nullish(),
    status: z.string().nullish(),
    vencimento: isoTimestampSchema.nullish(),
    pago_em: isoTimestampSchema.nullable().nullish(),
  })
  .passthrough();

// ─── Contestações ────────────────────────────────────────

export const contestacaoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    tipo: z.string().nullish(),
    status: z.string().nullish(),
    descricao: z.string().nullish(),
    created_at: isoTimestampSchema.nullish(),
  })
  .passthrough();

// ─── Notificações ────────────────────────────────────────

export const notificacaoConfigSchema = z.object({}).passthrough();
export const notificacaoConfigApiSchema = z.object({}).passthrough();
export const notificacaoConfigBackendRequestSchema = z.object({}).passthrough();
export const notificacaoConfigFormSchema = z.object({}).passthrough();

// ─── Auditoria ───────────────────────────────────────────

export const logAuditoriaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    usuario_id: z.number().int().or(z.string()).nullish(),
    acao: z.string().nullish(),
    entidade: z.string().nullish(),
    created_at: isoTimestampSchema.nullish(),
  })
  .passthrough();

// ─── Dashboard ───────────────────────────────────────────

export const dashboardStatsSchema = z.object({}).passthrough();

export const chartDataPointSchema = z
  .object({
    label: z.string().or(z.number()),
    value: z.number(),
  })
  .passthrough();

export const topClienteSchema = z
  .object({
    cliente_id: z.number().int().or(z.string()).nullish(),
    nome: z.string().nullish(),
    total: z.number().nullish(),
  })
  .passthrough();

// ─── Inferred types ──────────────────────────────────────

export type EmpresaRef = z.infer<typeof empresaRefSchema>;
export type Empresa = z.infer<typeof empresaSchema>;
export type Usuario = z.infer<typeof usuarioSchema>;
export type UsuarioInterno = z.infer<typeof usuarioInternoSchema>;
export type UnidadeNegocio = z.infer<typeof unidadeNegocioSchema>;
export type Cliente = z.infer<typeof clienteSchema>;
export type ClienteSaldo = z.infer<typeof clienteSaldoSchema>;
export type Campanha = z.infer<typeof campanhaSchema>;
export type TransacaoBase = z.infer<typeof transacaoBaseSchema>;
export type Transacao = z.infer<typeof transacaoSchema>;
export type Plano = z.infer<typeof planoSchema>;
export type Assinatura = z.infer<typeof assinaturaSchema>;
export type Fatura = z.infer<typeof faturaSchema>;
export type Contestacao = z.infer<typeof contestacaoSchema>;
export type NotificacaoConfig = z.infer<typeof notificacaoConfigSchema>;
export type NotificacaoConfigApiData = z.infer<typeof notificacaoConfigApiSchema>;
export type NotificacaoConfigBackendRequest = z.infer<typeof notificacaoConfigBackendRequestSchema>;
export type NotificacaoConfigFormData = z.infer<typeof notificacaoConfigFormSchema>;
export type LogAuditoria = z.infer<typeof logAuditoriaSchema>;
export type DashboardStats = z.infer<typeof dashboardStatsSchema>;
export type ChartDataPoint = z.infer<typeof chartDataPointSchema>;
export type TopCliente = z.infer<typeof topClienteSchema>;
