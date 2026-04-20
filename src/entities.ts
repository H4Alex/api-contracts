/**
 * Entity schemas. Initial release uses permissive shapes (passthrough) — only
 * key identifiers and status fields are required. Strict shapes are tracked
 * in the project board. Bump minor version as each schema is hardened.
 */
import { z } from 'zod';
import { isoTimestampSchema } from './common.js';
import {
  assinaturaCicloEnum,
  assinaturaStatusEnum,
  campanhaStatusEnum,
  contestacaoStatusEnum,
  contestacaoTipoEnum,
  faturaStatusEnum,
  nivelRelatorioEnum,
  nivelSuporteEnum,
  perfilEmpresaEnum,
  perfilUsuarioInternoEnum,
  statusCashbackEnum,
  statusVendaEnum,
  tipoGlobalEnum,
  unidadeStatusEnum,
} from './enums.js';

// ─── Empresa & Usuários ──────────────────────────────────

export const empresaRefSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    slug: z.string().optional(),
    perfil: perfilEmpresaEnum.optional(),
  })
  .passthrough();

export const empresaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    cnpj: z.string().optional(),
    status: unidadeStatusEnum.optional(),
    created_at: isoTimestampSchema.optional(),
  })
  .passthrough();

export const usuarioSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    email: z.string().email().optional(),
    tipo_global: tipoGlobalEnum.optional(),
  })
  .passthrough();

export const usuarioInternoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    email: z.string().email(),
    perfil: perfilUsuarioInternoEnum,
  })
  .passthrough();

export const unidadeNegocioSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    status: unidadeStatusEnum.optional(),
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
    cliente_id: z.number().int().or(z.string()),
    saldo_disponivel: z.number(),
    saldo_bloqueado: z.number().optional(),
    saldo_pendente: z.number().optional(),
  })
  .passthrough();

// ─── Campanhas ───────────────────────────────────────────

export const campanhaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    status: campanhaStatusEnum,
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
    valor: z.number(),
    status: statusCashbackEnum.or(statusVendaEnum).optional(),
    created_at: isoTimestampSchema.optional(),
  })
  .passthrough();

export const transacaoSchema = transacaoBaseSchema;

// ─── Assinatura & Billing ────────────────────────────────

export const planoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    nome: z.string(),
    ciclo: assinaturaCicloEnum.optional(),
    preco: z.number().optional(),
    nivel_relatorio: nivelRelatorioEnum.optional(),
    nivel_suporte: nivelSuporteEnum.optional(),
  })
  .passthrough();

export const assinaturaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    plano_id: z.number().int().or(z.string()).optional(),
    status: assinaturaStatusEnum,
    ciclo: assinaturaCicloEnum.optional(),
    started_at: isoTimestampSchema.optional(),
    expires_at: isoTimestampSchema.nullable().optional(),
  })
  .passthrough();

export const faturaSchema = z
  .object({
    id: z.number().int().or(z.string()),
    valor: z.number(),
    status: faturaStatusEnum,
    vencimento: isoTimestampSchema,
    pago_em: isoTimestampSchema.nullable().optional(),
  })
  .passthrough();

// ─── Contestações ────────────────────────────────────────

export const contestacaoSchema = z
  .object({
    id: z.number().int().or(z.string()),
    tipo: contestacaoTipoEnum,
    status: contestacaoStatusEnum,
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
    acao: z.string(),
    entidade: z.string().optional(),
    created_at: isoTimestampSchema,
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
    cliente_id: z.number().int().or(z.string()),
    nome: z.string().optional(),
    total: z.number(),
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
