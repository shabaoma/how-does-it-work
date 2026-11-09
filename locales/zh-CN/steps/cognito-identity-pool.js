const actors = `actor U as 用户
    participant A as 客户端应用
    participant P as 用户池
    participant C as 身份池
    participant R as AWS 服务`;
const step = (label, kicker, title, detail, note, messages) => ({ label, kicker, title, detail, note, diagram: `sequenceDiagram\n    ${actors}\n    ${messages}` });
module.exports = { steps: [
  step('1 用户登录', 'SIGN IN', '用户池验证用户并签发令牌', '用户通过客户端使用用户池配置的登录方式完成认证。用户池返回 ID 令牌等登录结果，客户端接下来用 ID 令牌向身份池证明登录身份。', '身份池也支持其他配置的身份提供方；用户池和身份池是不同的服务组件。', 'U->>A: 发起登录\n    A->>P: 按配置完成认证\n    P-->>A: 返回 ID 令牌等结果'),
  step('2 获取身份标识', 'GET ID', '身份池关联并返回 Identity ID', '客户端调用 GetId，提交身份池 ID 和包含用户池提供方名称与 ID 令牌的 Logins 映射。Cognito 关联该登录身份并返回 Identity ID；后续请求可以使用该标识。', 'Identity ID 标识联合身份，本身不是凭证或授权证明；关联或合并身份时标识可能发生变化。', 'A->>C: GetId 加身份池 ID 和 Logins\n    C-->>A: 返回 Identity ID'),
  step('3 获取临时凭证', 'GET CREDENTIALS', '身份池按配置提供临时凭证', '客户端调用 GetCredentialsForIdentity，提交 Identity ID 和登录令牌。身份池验证登录信息、根据配置选择 IAM 角色，并通过 AWS STS 获取临时凭证后返回。', '返回的凭证包含访问密钥 ID、秘密访问密钥、会话令牌和过期时间；客户端需要保护这些值。', 'A->>C: GetCredentialsForIdentity 加 Identity ID 和 Logins\n    Note over C: 验证身份并选择角色\n    C-->>A: 返回临时凭证和过期时间'),
  step('4 访问 AWS 服务', 'ACCESS', '客户端签名请求，服务检查权限', '客户端使用临时凭证为 AWS 请求签名，并携带会话令牌。目标服务依据角色权限和其他适用策略评估请求，允许后才执行操作。', '持有凭证不代表可以访问所有资源；身份池、角色信任策略、权限策略和资源策略必须匹配。', 'A->>R: 使用临时凭证签名请求\n    Note over R: 评估适用的访问策略\n    R-->>A: 返回结果或拒绝访问'),
  step('5 刷新凭证', 'REFRESH', '凭证到期前重新获取', '临时凭证有过期时间。客户端通常通过 AWS SDK 的凭证提供程序重新获取；如果登录令牌也已过期，需要先通过用户池支持的流程更新登录状态。', '若刷新失败，应用应处理重新登录或访问失败，而不是继续使用过期凭证。', 'A->>C: 用有效登录信息重新请求凭证\n    C-->>A: 返回新的临时凭证和过期时间')
] };
