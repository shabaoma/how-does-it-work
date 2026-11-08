const actors = 'actor U as 用户\nparticipant C as Codex\nparticipant R as uvx\nparticipant S as MCP Server\nparticipant A as 目标服务';
const rows = [
  ['1 读取配置', 'CONFIG', 'Codex 读取配置', 'Codex 读取 Server 的启动命令和参数，了解如何连接工具提供方。', '全局配置可供多个项目使用；有配置不等于连接成功。', 'U->>C: 提出任务\nC->>C: 读取 MCP 配置'],
  ['2 启动程序', 'START', 'uvx 启动本地 Server', 'Codex 执行配置的命令，uvx 准备 Python 包并启动 Server 进程。', 'uvx 可以复用缓存，也可能需要下载；程序不必放在项目中。', 'C->>R: 执行命令和参数\nR->>S: 准备并启动 Server'],
  ['3 发现工具', 'DISCOVER', 'Codex 连接 Server', 'Codex 通过标准输入输出初始化 MCP 连接，并获取工具名称、说明和参数。', '启动或初始化失败时，配置仍可能存在，但工具不可用。', 'C->>S: 初始化并请求工具列表\nS-->>C: 返回连接信息和工具定义'],
  ['4 调用工具', 'CALL', 'Codex 发送工具请求', 'Codex 选择工具并发送参数；Server 处理请求，必要时访问目标服务。', '本地 Server 也可能是远程 MCP 服务的代理；认证、权限或网络问题可能导致失败。', 'C->>S: 调用工具及参数\nS->>A: 请求目标资源\nA-->>S: 返回数据或错误'],
  ['5 返回结果', 'RESULT', 'Codex 使用工具结果', 'Server 返回结果或错误，Codex 据此继续处理并向用户说明。', '工具结果可能含敏感信息，展示和保存需遵循任务要求。', 'S-->>C: 返回结果或错误\nC-->>U: 说明结果']
];
module.exports = { steps: rows.map(([label, kicker, title, detail, note, action]) => ({ label, kicker, title, detail, note, diagram: 'sequenceDiagram\n' + actors + '\n' + action })) };
