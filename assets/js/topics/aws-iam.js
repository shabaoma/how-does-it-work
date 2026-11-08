const steps = [
  {
    label: '1 发送请求', kicker: 'REQUEST', title: '调用方签名并请求对象',
    detail: '调用方使用已取得的角色会话临时凭证，对 S3 GetObject 请求签名，并提供访问密钥 ID 和会话令牌。请求指定目标存储桶和对象。',
    note: '秘密访问密钥用于计算签名，不直接作为请求参数发送；临时凭证有有效期。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as S3 服务
      participant P as IAM 授权
      participant R as S3 对象
      C->>S: 签名 GetObject 请求及会话令牌`
  },
  {
    label: '2 验证身份', kicker: 'AUTHENTICATION', title: 'AWS 验证请求凭证',
    detail: 'AWS 验证签名和临时凭证，并确定请求对应的角色会话。验证成功后，才能按该主体评估本次访问。',
    note: '签名无效或凭证过期会导致请求失败。部分服务支持匿名请求，本例使用已认证的角色会话。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as S3 服务
      participant P as IAM 授权
      participant R as S3 对象
      S->>S: 验证签名和临时凭证
      alt 验证失败
        S-->>C: 返回错误
      end`
  },
  {
    label: '3 评估策略', kicker: 'AUTHORIZATION', title: 'AWS 评估适用策略',
    detail: 'AWS 根据主体、操作、资源及请求上下文，评估适用的身份策略、资源策略和其他限制。匹配的显式拒绝优先；没有满足评估规则的允许时，请求被隐式拒绝。',
    note: '策略条件可检查例如来源网络或主体标签；不同策略类型及资源策略指定的主体会影响最终评估。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as S3 服务
      participant P as IAM 授权
      participant R as S3 对象
      S->>P: 评估主体、操作、资源和上下文
      P-->>S: 允许或拒绝`
  },
  {
    label: '4 返回结果', kicker: 'RESULT', title: 'S3 执行或拒绝请求',
    detail: '授权允许且其他服务检查通过时，S3 读取对象并返回数据；授权拒绝时，服务返回访问错误，不执行读取。',
    note: '允许只是执行操作的必要条件之一；对象不存在或其他服务特定检查失败也可能导致错误。',
    diagram: `sequenceDiagram
      participant C as 调用方
      participant S as S3 服务
      participant P as IAM 授权
      participant R as S3 对象
      alt 允许且其他检查通过
        S->>R: 读取对象
        R-->>S: 对象数据
        S-->>C: 返回对象
      else 拒绝或其他错误
        S-->>C: 返回错误
      end`
  }
];
window.topicData = { steps };
