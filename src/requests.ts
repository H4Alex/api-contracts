/**
 * Request + Response schemas. Initial release uses permissive shapes
 * (passthrough) for request bodies. Response schemas reuse entity schemas
 * where possible. Harden each one as real contract tests return.
 */
import { z } from 'zod';
import {
  empresaRefSchema,
  usuarioSchema,
} from './entities.js';

// ─── Auth ────────────────────────────────────────────────

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerRequestSchema = z
  .object({
    nome: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  })
  .passthrough();

export const registerResponseSchema = z.object({
  user: usuarioSchema,
  token: z.string().optional(),
}).passthrough();

export const loginSingleEmpresaResponseSchema = z
  .object({
    user: usuarioSchema,
    empresa: empresaRefSchema,
    token: z.string(),
    refresh_token: z.string().optional(),
  })
  .passthrough();

export const loginMultiEmpresaResponseSchema = z
  .object({
    user: usuarioSchema,
    empresas: z.array(empresaRefSchema),
    intermediate_token: z.string().optional(),
  })
  .passthrough();

export const loginAdminResponseSchema = z
  .object({
    user: usuarioSchema,
    token: z.string(),
  })
  .passthrough();

export const meResponseSchema = z
  .object({
    user: usuarioSchema,
    empresa: empresaRefSchema.optional(),
  })
  .passthrough();

export const refreshTokenResponseSchema = z.object({
  token: z.string(),
  refresh_token: z.string().optional(),
}).passthrough();

export const switchEmpresaRequestSchema = z.object({
  empresa_id: z.number().int().or(z.string()),
});

export const switchEmpresaResponseSchema = loginSingleEmpresaResponseSchema;

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
  password: z.string().min(1),
  password_confirmation: z.string().min(1),
});

// ─── 2FA / MFA ───────────────────────────────────────────

export const twoFactorSetupResponseSchema = z.object({
  secret: z.string(),
  qr_code_url: z.string().optional(),
  otpauth_url: z.string().optional(),
}).passthrough();

export const twoFactorConfirmRequestSchema = z.object({
  code: z.string().min(1),
});

export const twoFactorConfirmResponseSchema = z.object({
  enabled: z.boolean(),
  backup_codes: z.array(z.string()).optional(),
}).passthrough();

export const twoFactorVerifyRequestSchema = z.object({
  code: z.string().min(1),
});

export const twoFactorVerifyResponseSchema = z.object({
  verified: z.boolean(),
  token: z.string().optional(),
}).passthrough();

export const twoFactorBackupCodesResponseSchema = z.object({
  backup_codes: z.array(z.string()),
}).passthrough();

export const twoFactorDisableRequestSchema = z.object({
  password: z.string().min(1),
});

// ─── Campanha CRUD ───────────────────────────────────────

export const criarCampanhaRequestSchema = z.object({}).passthrough();
export const atualizarCampanhaRequestSchema = z.object({}).passthrough();

// ─── Cliente CRUD ────────────────────────────────────────

export const criarClienteRequestSchema = z.object({}).passthrough();
export const atualizarClienteRequestSchema = z.object({}).passthrough();

// ─── Unidade CRUD ────────────────────────────────────────

export const criarUnidadeRequestSchema = z.object({}).passthrough();
export const atualizarUnidadeRequestSchema = z.object({}).passthrough();

// ─── Usuário Interno CRUD ────────────────────────────────

export const criarUsuarioInternoRequestSchema = z.object({}).passthrough();
export const atualizarUsuarioInternoRequestSchema = z.object({}).passthrough();

// ─── Cashback ────────────────────────────────────────────

export const gerarCashbackRequestSchema = z
  .object({
    cliente_id: z.number().int().or(z.string()),
    valor: z.number().positive(),
  })
  .passthrough();

export const gerarCashbackApiSchema = gerarCashbackRequestSchema;

export const utilizarCashbackRequestSchema = z
  .object({
    cliente_id: z.number().int().or(z.string()),
    valor: z.number().positive(),
  })
  .passthrough();

export const utilizarCashbackApiSchema = utilizarCashbackRequestSchema;

export const listTransacoesRequestSchema = z.object({}).passthrough();

// ─── Contestação ─────────────────────────────────────────

export const criarContestacaoRequestSchema = z.object({}).passthrough();
export const resolverContestacaoRequestSchema = z.object({}).passthrough();
export const listContestacoesRequestSchema = z.object({}).passthrough();

// ─── Notificação Config ──────────────────────────────────

export const atualizarNotificacaoConfigRequestSchema = z.object({}).passthrough();
export const atualizarConfigRequestSchema = z.object({}).passthrough();

// ─── Assinatura ──────────────────────────────────────────

export const upgradeAssinaturaRequestSchema = z.object({
  plano_id: z.number().int().or(z.string()),
}).passthrough();

// ─── Inferred types ──────────────────────────────────────

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginSingleEmpresaResponse = z.infer<typeof loginSingleEmpresaResponseSchema>;
export type LoginMultiEmpresaResponse = z.infer<typeof loginMultiEmpresaResponseSchema>;
export type LoginResponse = LoginSingleEmpresaResponse | LoginMultiEmpresaResponse;
export type LoginAdminResponse = z.infer<typeof loginAdminResponseSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
export type SwitchEmpresaRequest = z.infer<typeof switchEmpresaRequestSchema>;
export type SwitchEmpresaResponse = z.infer<typeof switchEmpresaResponseSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
export type TwoFactorSetupResponse = z.infer<typeof twoFactorSetupResponseSchema>;
export type TwoFactorConfirmRequest = z.infer<typeof twoFactorConfirmRequestSchema>;
export type TwoFactorConfirmResponse = z.infer<typeof twoFactorConfirmResponseSchema>;
export type TwoFactorVerifyRequest = z.infer<typeof twoFactorVerifyRequestSchema>;
export type TwoFactorVerifyResponse = z.infer<typeof twoFactorVerifyResponseSchema>;
export type TwoFactorDisableRequest = z.infer<typeof twoFactorDisableRequestSchema>;
export type CriarCampanhaRequest = z.infer<typeof criarCampanhaRequestSchema>;
export type AtualizarCampanhaRequest = z.infer<typeof atualizarCampanhaRequestSchema>;
export type CriarClienteRequest = z.infer<typeof criarClienteRequestSchema>;
export type AtualizarClienteRequest = z.infer<typeof atualizarClienteRequestSchema>;
export type CriarUnidadeRequest = z.infer<typeof criarUnidadeRequestSchema>;
export type AtualizarUnidadeRequest = z.infer<typeof atualizarUnidadeRequestSchema>;
export type CriarUsuarioInternoRequest = z.infer<typeof criarUsuarioInternoRequestSchema>;
export type AtualizarUsuarioInternoRequest = z.infer<typeof atualizarUsuarioInternoRequestSchema>;
export type GerarCashbackRequest = z.infer<typeof gerarCashbackRequestSchema>;
export type UtilizarCashbackRequest = z.infer<typeof utilizarCashbackRequestSchema>;
export type ListTransacoesRequest = z.infer<typeof listTransacoesRequestSchema>;
export type CriarContestacaoRequest = z.infer<typeof criarContestacaoRequestSchema>;
export type ResolverContestacaoRequest = z.infer<typeof resolverContestacaoRequestSchema>;
export type ListContestacoesRequest = z.infer<typeof listContestacoesRequestSchema>;
export type AtualizarNotificacaoConfigRequest = z.infer<typeof atualizarNotificacaoConfigRequestSchema>;
export type AtualizarConfigRequest = z.infer<typeof atualizarConfigRequestSchema>;
export type UpgradeAssinaturaRequest = z.infer<typeof upgradeAssinaturaRequestSchema>;
