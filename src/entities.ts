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
    nome: z.string().optional(),
    slug: z.string().optional(),
    perfil: z.string().optional(),
  })
  .passthrough();

export const empresaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    cnpj: z.string().optional(),
    status: z.string().optional(),
    created_at: isoTimestampSchema.optional(),
  })
  .passthrough();

export const usuarioSchema = z
  .object({
    id: z.number().int().or(z.string()).optional(),
    nome: z.string().optional(),
    email: z.string().email().optional(),
    tipo_global: z.string().optional(),
  })
  .passthrough();

export const usuarioInternoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    email: z.string().email().optional(),
    perfil: z.string().optional(),
  })
  .passthrough();

export const unidadeNegocioSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    status: z.string().optional(),
  })
  .passthrough();

// ─── Clientes ────────────────────────────────────────────

export const clienteSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    cpf: z.string().optional(),
    email: z.string().email().optional(),
    telefone: z.string().optional(),
  })
  .passthrough();

export const clienteSaldoSchema = z
  .object({
    cliente_id: z.number().int().or(z.string()).optional(),
    saldo_disponivel: z.number().optional(),
    saldo_bloqueado: z.number().optional(),
    saldo_pendente: z.number().optional(),
  })
  .passthrough();

// ─── Campanhas ───────────────────────────────────────────

export const campanhaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    status: z.string().optional(),
    percentual_cashback: z.number().optional(),
    inicio: isoTimestampSchema.nullable().optional(),
    fim: isoTimestampSchema.nullable().optional(),
  })
  .passthrough();

// ─── Transações / Cashback ───────────────────────────────

export const transacaoBaseSchema = z
  .object({
    id: z.number().int().or(z.string()),
    cliente_id: z.number().int().or(z.string()).optional(),
    valor: z.number().optional(),
    status: z.string().optional(),
    created_at: isoTimestampSchema.optional(),
  })
  .passthrough();

export const transacaoSchema = transacaoBaseSchema;

// ─── Assinatura & Billing ────────────────────────────────

export const planoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    ciclo: z.string().optional(),
    preco: z.number().optional(),
    nivel_relatorio: z.string().optional(),
    nivel_suporte: z.string().optional(),
  })
  .passthrough();

export const assinaturaSchema = z
  .object({
    id: z.number().int().or(z.string()).optional(),
    plano_id: z.number().int().or(z.string()).optional(),
    status: z.string().optional(),
    ciclo: z.string().optional(),
    started_at: isoTimestampSchema.optional(),
    expires_at: isoTimestampSchema.nullable().optional(),
  })
  .passthrough();

export const faturaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    valor: z.number().optional(),
    status: z.string().optional(),
    vencimento: isoTimestampSchema.optional(),
    pago_em: isoTimestampSchema.nullable().optional(),
  })
  .passthrough();

// ─── Contestações ────────────────────────────────────────

export const contestacaoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    tipo: z.string().optional(),
    status: z.string().optional(),
    descricao: z.string().optional(),
    created_at: isoTimestampSchema.optional(),
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
    usuario_id: z.number().int().or(z.string()).optional(),
    acao: z.string().optional(),
    entidade: z.string().optional(),
    created_at: isoTimestampSchema.optional(),
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
    cliente_id: z.number().int().or(z.string()).optional(),
    nome: z.string().optional(),
    total: z.number().optional(),
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
