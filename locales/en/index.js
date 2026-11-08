const content = require('./content.json');
const metadata = require('./topics');
const steps = {
  dropboxSync: require('./steps/dropbox-sync'),
  notionSync: require('./steps/notion-sync'),
  codexMcp: require('./steps/codex-mcp'),
  sessionCookie: require('./steps/session-cookie'),
  accessSecretToken: require('./steps/access-secret-token'),
  sso: require('./steps/sso'),
  oauthPkce: require('./steps/oauth-pkce'),
  oidcLogin: require('./steps/oidc-login'),
  webhook: require('./steps/webhook'),
  cacheInvalidation: require('./steps/cache-invalidation'),
  emailCode: require('./steps/email-code'),
  threeDSecure: require('./steps/3d-secure'),
  paymentIdempotency: require('./steps/payment-idempotency'),
  awsSts: require('./steps/aws-sts'),
  awsIam: require('./steps/aws-iam'),
  awsSsm: require('./steps/aws-ssm')
};
const topics = Object.fromEntries(Object.keys(metadata).map(key => [key, { ...content[key], ...metadata[key], ...steps[key] }]));
const en = {
  code: 'en', prefix: 'en', name: 'English', topics,
  categories: { identity: 'Identity and login', integration: 'Service integration', distributed: 'Distributed systems', payments: 'Payments', cloud: 'Cloud services' },
  home: { title: 'How technology works', description: 'Understand technology through diagrams and step-by-step explanations.', lead: 'Explore common technologies through their participants, data flows, and key boundaries.', footer: 'These pages illustrate common flows; consult the relevant protocols and implementations for actual behavior.' },
  ui: { language: 'Language', guide: 'GUIDE', explore: 'Explore topics', count: 'topics', topics: 'Topics', navigation: 'Topics', home: 'Home', steps: 'Step by step', flowSteps: 'Flow steps', previous: 'Previous', next: 'Next', detail: 'What happens in this step', loading: 'Loading diagram…', diagramError: 'The diagram could not be loaded. Please refresh and try again.', progress: 'Step {current} of {total}', overview: 'Overview', boundaries: 'Key boundaries', exploreFlow: 'Explore the flow →' }
};
module.exports = en;
