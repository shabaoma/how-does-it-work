module.exports = {
  cacheAvalanche: {"label": "Cache avalanche", "title": "Cache avalanche", "description": "How many cache entries expiring together or a cache outage can flood the backing service, and how to contain the surge."},
  cacheBreakdown: {"label": "Cache breakdown", "title": "Cache breakdown", "description": "How concurrent requests for an expired hot key can overload the database, and how request coalescing and stale responses can limit the stampede."},
  waterfall: { label: 'Waterfall development', title: 'Waterfall development flow', description: 'Follow requirements, design, implementation, verification and release through reviewed phases.' },
  agile: { label: 'Agile development', title: 'Agile development flow', description: 'Follow small increments, continuous testing, stakeholder feedback and adaptation.' },
  releaseMethods: { label: 'Release methods', title: 'How software releases work', description: 'Compare release branches, trunk releases, maintenance branches, and delivery strategies.' },
  cognitoIdentityPool: { label: 'Cognito identity pools', title: 'Cognito identity pools and identity IDs', description: 'Follow an identity from sign-in to temporary AWS credentials.' },
  cachePenetration: { label: 'Cache penetration', title: 'Cache penetration', description: 'Why missing keys repeatedly reach the database and how to reduce the load.' },
  isuconAgents: { label: 'ISUCON agent optimization', title: 'How agents optimized an ISUCON entry', description: 'Follow the roles, experiments and stopping decision in an autonomous competition workflow.' },
  aiDistillation: { label: 'Model distillation', title: 'How AI model distillation works', description: 'See how a student model learns from a teacher model.' },
  socialNetwork: { label: 'Social networks', title: 'How to design a social network', description: 'Explore follows, posts, feeds, and interactions.' },
  dropboxSync: { label: 'Dropbox device sync', title: 'How Dropbox syncs across devices', description: 'Follow file changes, block transfers, and conflicts.' },
  notionSync: { label: 'Notion device sync', title: 'How Notion syncs across devices', description: 'Follow offline storage, update notifications, and conflict handling.' },
  codexMcp: { label: 'Codex MCP tool calls', title: 'How Codex runs MCP', description: 'Follow configuration, startup and tool calls.' },
  awsSsm: { label: 'AWS SSM session management', title: 'AWS Systems Manager', description: 'See how Session Manager connects to a managed node.' },
  cacheInvalidation: { label: 'Cache updates and invalidation', title: 'Cache updates and invalidation', description: 'Follow cache-aside reads and writes, including races and stale data.' },
  paymentIdempotency: { label: 'Payment idempotency', title: 'Payment idempotency', description: 'How a payment request can be retried safely after a timeout.' },
  webhook: { label: 'Webhooks', title: 'Webhook event notifications', description: 'How services deliver, verify, and process asynchronous event notifications.' },
  oidcLogin: { label: 'OpenID Connect login', title: 'OpenID Connect login', description: 'How an application verifies an identity provider’s authentication result.' },
  oauthPkce: { label: 'OAuth authorization code and PKCE', title: 'OAuth 2.0 authorization code and PKCE', description: 'How an application obtains authorization and PKCE binds the authorization code.' },
  "sessionCookie": {
    "label": "Session cookie login",
    "title": "Session cookie login",
    "description": "How a browser stores a session identifier and a server restores login state."
  },
  "accessSecretToken": {
    "label": "Access and secret tokens",
    "title": "Access tokens and secret tokens",
    "description": "How access and refresh tokens support authentication and where each must be protected."
  },
  "sso": {
    "label": "External SSO login and logout",
    "title": "External SSO login and logout",
    "description": "Follow single sign-on, application sessions, and logout propagation with OpenID Connect."
  },
  "emailCode": {
    "label": "Email verification code login",
    "title": "Email verification code login",
    "description": "Follow a one-time email code from delivery to a signed-in session."
  },
  "threeDSecure": {
    "label": "3D Secure payment authentication",
    "title": "3D Secure payment authentication",
    "description": "The participants and flow of cardholder authentication for online payments."
  },
  "awsSts": {
    "label": "AWS STS temporary credentials",
    "title": "How AWS STS works",
    "description": "Learn about temporary credentials and permissions using cross-account AssumeRole."
  },
  "awsIam": {
    "label": "AWS IAM permissions",
    "title": "How AWS IAM works",
    "description": "How AWS authenticates requests and evaluates access permissions."
  }
};
