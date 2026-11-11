// 菜单和首页目录按从上到下的顺序显示；上下移动整行即可调整顺序。
// # 后面是分类 key，其后的主题属于该分类；移动分类时请连同它的主题一起移动。
// 每个主题 key 必须出现一次，且与 topics.js 中的分类一致。
module.exports = [
  '# engineering',
  'releaseMethods',
  'waterfall',
  'agile',

  '# ai',
  'isuconAgents',
  'aiDistillation',
  'codexMcp',

  '# distributed',
  'dropboxSync',
  'notionSync',
  'socialNetwork',
  'cachePenetration',
  'cacheInvalidation',

  '# identity',
  'sessionCookie',
  'accessSecretToken',
  'sso',
  'oauthPkce',
  'oidcLogin',
  'emailCode',

  '# cloud',
  'cognitoIdentityPool',
  'awsSts',
  'awsIam',
  'awsSsm',

  '# payments',
  'threeDSecure',
  'paymentIdempotency',

  '# integration',
  'webhook',
];
