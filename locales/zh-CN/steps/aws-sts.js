const steps = [
  {
    label: '1 请求角色', kicker: 'ASSUME ROLE', title: '调用方请求代入角色',
    detail: '调用方使用已有 AWS 凭证向 STS 发送签名的 AssumeRole 请求，指定目标角色 ARN、会话名称和所需时长。',
    note: '跨账户场景中，调用方需要获得 sts:AssumeRole 权限，目标角色也必须信任该调用方；信任策略还可要求多因素认证等条件。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as STS
      C->>S: AssumeRole 角色 ARN、会话名称、时长`
  },
  {
    label: '2 检查信任', kicker: 'TRUST', title: 'STS 检查是否允许代入',
    detail: 'AWS 对请求进行身份验证和授权评估，包括目标角色的信任策略及跨账户调用方的权限。条件满足时，STS 才创建角色会话。',
    note: '检查失败时返回错误，不会签发该角色的临时凭证。角色信任策略控制谁能代入角色，不等于资源访问权限。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as STS
      participant I as IAM 策略
      S->>I: 评估信任及调用权限
      I-->>S: 授权结果
      alt 不允许
        S-->>C: 返回错误
      end`
  },
  {
    label: '3 返回凭证', kicker: 'CREDENTIALS', title: 'STS 返回临时凭证',
    detail: 'STS 向调用方返回访问密钥 ID、秘密访问密钥、会话令牌和过期时间。这组凭证代表刚创建的角色会话。',
    note: '临时凭证也需要保密；会话令牌必须与对应的密钥对一起使用。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as STS
      S-->>C: 临时密钥对、会话令牌、过期时间`
  },
  {
    label: '4 访问资源', kicker: 'SIGNED REQUEST', title: '调用方以角色会话访问资源',
    detail: '调用方用临时秘密访问密钥为请求签名，并提供访问密钥 ID 和会话令牌。目标 AWS 服务验证凭证并评估这次操作的权限，再返回结果。',
    note: '成功取得凭证不保证每次访问都成功：资源策略或其他适用策略的显式拒绝等因素仍可能阻止请求。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant R as AWS 资源服务
      C->>R: 签名请求、会话令牌
      R-->>C: 授权结果或资源数据`
  },
  {
    label: '5 更新凭证', kicker: 'EXPIRATION', title: '到期前重新取得凭证',
    detail: '临时凭证到期后不能继续用于请求。需要继续访问时，调用方或其凭证提供程序再次申请一组新凭证，并使用新密钥对和会话令牌。',
    note: '重新申请仍须满足当时的信任与授权条件；旧会话令牌本身不是用于换取新凭证的刷新令牌。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as STS
      C->>S: 再次请求 AssumeRole
      S-->>C: 新的临时凭证`
  }
];

/* 整体图和步骤图共享主题；关闭自动缩放，让窄屏容器横向滚动。 */
module.exports = { steps };
