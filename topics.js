const topics = [
  { key: 'isuconAgents', url: 'isucon-multi-agent.html', updated: '2026-11-09', category: 'ai' },
  { key: 'aiDistillation', url: 'ai-distillation.html', updated: '2026-11-09', category: 'ai' },
  { key: 'sessionCookie', url: 'session-cookie.html', updated: '2026-11-08', category: 'identity' },
  { key: 'accessSecretToken', url: 'access-secret-token.html', updated: '2026-11-08', category: 'identity' },
  { key: 'sso', url: 'sso.html', updated: '2026-11-08', category: 'identity' },
  { key: 'oauthPkce', url: 'oauth-pkce.html', updated: '2026-11-08', category: 'identity' },
  { key: 'oidcLogin', url: 'oidc-login.html', updated: '2026-11-08', category: 'identity' },
  { key: 'emailCode', url: 'email-code.html', updated: '2026-11-08', category: 'identity' },
  { key: 'codexMcp', url: 'codex-mcp.html', updated: '2026-11-08', category: 'integration' },
  { key: 'webhook', url: 'webhook.html', updated: '2026-11-08', category: 'integration' },
  { key: 'dropboxSync', url: 'dropbox-sync.html', updated: '2026-11-08', category: 'distributed' },
  { key: 'notionSync', url: 'notion-sync.html', updated: '2026-11-08', category: 'distributed' },
  { key: 'socialNetwork', url: 'social-network.html', updated: '2026-11-08', category: 'distributed' },
  { key: 'cacheInvalidation', url: 'cache-invalidation.html', updated: '2026-11-08', category: 'distributed' },
  { key: 'threeDSecure', url: '3d-secure.html', updated: '2026-11-08', category: 'payments' },
  { key: 'paymentIdempotency', url: 'payment-idempotency.html', updated: '2026-11-08', category: 'payments' },
  { key: 'awsSts', url: 'aws-sts.html', updated: '2026-11-08', category: 'cloud' },
  { key: 'awsIam', url: 'aws-iam.html', updated: '2026-11-08', category: 'cloud' },
  { key: 'awsSsm', url: 'aws-ssm.html', updated: '2026-11-08', category: 'cloud' }
];
module.exports = topics;
