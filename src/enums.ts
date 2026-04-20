import { z } from 'zod';

export const tipoGlobalEnum = z.enum(['admin', 'lojista', 'cliente', 'operador']);
export type TipoGlobal = z.infer<typeof tipoGlobalEnum>;

export const perfilEmpresaEnum = z.enum(['owner', 'admin', 'operador', 'financeiro', 'viewer']);
export type EmpresaPerfil = z.infer<typeof perfilEmpresaEnum>;

export const perfilUsuarioInternoEnum = z.enum(['admin', 'operador', 'financeiro', 'viewer']);
export type PerfilUsuarioInterno = z.infer<typeof perfilUsuarioInternoEnum>;

export const assinaturaCicloEnum = z.enum(['mensal', 'trimestral', 'semestral', 'anual']);
export type AssinaturaCiclo = z.infer<typeof assinaturaCicloEnum>;

export const assinaturaStatusEnum = z.enum([
  'active',
  'trial',
  'past_due',
  'paused',
  'cancelled',
  'expired',
]);
export type AssinaturaStatus = z.infer<typeof assinaturaStatusEnum>;

export const campanhaStatusEnum = z.enum(['draft', 'active', 'paused', 'archived', 'scheduled']);
export type CampanhaStatus = z.infer<typeof campanhaStatusEnum>;

export const canalNotificacaoEnum = z.enum(['email', 'sms', 'push', 'whatsapp', 'inapp']);
export type CanalNotificacao = z.infer<typeof canalNotificacaoEnum>;

export const contestacaoStatusEnum = z.enum([
  'aberta',
  'em_analise',
  'resolvida',
  'rejeitada',
  'escalada',
]);
export type ContestacaoStatus = z.infer<typeof contestacaoStatusEnum>;

export const contestacaoTipoEnum = z.enum([
  'fraude',
  'valor_incorreto',
  'cashback_nao_creditado',
  'cashback_nao_resgatado',
  'outro',
]);
export type ContestacaoTipo = z.infer<typeof contestacaoTipoEnum>;

export const faturaStatusEnum = z.enum([
  'pending',
  'paid',
  'overdue',
  'cancelled',
  'refunded',
  'failed',
]);
export type FaturaStatus = z.infer<typeof faturaStatusEnum>;

export const modoSaldoEnum = z.enum(['creditar', 'debitar', 'bloquear', 'desbloquear']);
export type ModoSaldo = z.infer<typeof modoSaldoEnum>;

export const nivelRelatorioEnum = z.enum(['basico', 'avancado', 'completo', 'premium']);
export type NivelRelatorio = z.infer<typeof nivelRelatorioEnum>;

export const nivelSuporteEnum = z.enum(['basico', 'priorizado', 'dedicado', 'vip']);
export type NivelSuporte = z.infer<typeof nivelSuporteEnum>;

export const statusCashbackEnum = z.enum([
  'credited',
  'pending',
  'redeemed',
  'expired',
  'processing',
  'cancelled',
  'refunded',
]);
export type StatusCashback = z.infer<typeof statusCashbackEnum>;

export const statusVendaEnum = z.enum([
  'concluida',
  'pendente',
  'cancelada',
  'estornada',
  'em_analise',
]);
export type StatusVenda = z.infer<typeof statusVendaEnum>;

export const unidadeStatusEnum = z.enum(['active', 'inactive', 'suspended']);
export type UnidadeStatus = z.infer<typeof unidadeStatusEnum>;
