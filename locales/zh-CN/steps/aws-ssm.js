const actors = `actor U as 操作员
participant S as SSM 服务
participant A as SSM Agent
participant N as 托管节点`;
const rows = [
  ['1 连接服务', 'PREPARE', '节点连接 Systems Manager', 'EC2 节点上的 SSM Agent 使用节点凭证连接 Systems Manager 服务端点，使节点可被管理。', 'Agent 必须运行，节点权限和网络也要配置正确；节点离线时无法建立会话。', 'A->>S: 使用节点凭证建立出站连接'],
  ['2 请求会话', 'REQUEST', '操作员请求启动会话', '操作员通过控制台或 AWS CLI 指定托管节点并请求启动会话。服务验证调用身份、IAM 权限及会话配置。', '调用者的权限与节点使用的权限是两套独立的授权。', 'U->>S: StartSession（目标节点）\nS->>S: 验证身份、权限和配置'],
  ['3 建立通道', 'CONNECT', '服务与 Agent 建立会话', '检查通过后，服务通知 Agent 建立双向会话通道，客户端也连接到该通道。', 'CLI 交互会话需要 Session Manager 插件；通道使用 TLS，也可配置额外的 KMS 加密。', 'S->>A: 请求打开会话通道\nA->>S: 建立会话通道\nU->>S: 连接客户端通道'],
  ['4 交互操作', 'INTERACT', '输入和输出经通道传递', '操作员输入命令，服务通过会话通道传给 Agent；命令在节点上执行，输出经通道返回客户端。', '节点上的操作系统身份决定命令实际能做什么；IAM 授权启动会话不等于操作系统权限。', 'U->>S: 输入命令\nS->>A: 转发输入\nA->>N: 执行命令\nN-->>A: 输出\nA->>S: 发送输出\nS-->>U: 显示输出'],
  ['5 结束会话', 'CLOSE', '关闭会话并查看记录', '操作员结束会话后，交互通道关闭。管理员可根据已配置的日志和审计记录调查活动。', 'API 审计与会话内容日志是不同记录；内容日志需要预先配置，且并非所有会话类型都支持。', 'U->>S: 结束会话\nS->>A: 关闭会话\nS-->>U: 会话结束']
];
module.exports = { steps: rows.map(([label, kicker, title, detail, note, action]) => ({ label, kicker, title, detail, note, diagram: `sequenceDiagram\n${actors}\n${action}` })) };
