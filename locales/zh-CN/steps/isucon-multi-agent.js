const steps = [
  {
    "label": "1 人类准备",
    "kicker": "PREPARATION",
    "title": "赛前设计执行框架",
    "detail": "参赛者预先设置目标、工具、约束与决策方式，并通过练习改进流程。复盘称准备持续约三个月；比赛开始后，他启动 Agent，此后没有继续输入指令。",
    "note": "自主执行依赖事先准备和比赛环境提供的工具，并不意味着无需人的设计。",
    "diagram": "sequenceDiagram\n    participant P0 as 人\n    participant P1 as 框架\n    participant P2 as 主Agent\n    P0->>P1: 配置目标 约束和工具\n    P0->>P2: 启动比赛任务\n    P1->>P2: 提供执行规则"
  },
  {
    "label": "2 主 Agent 调查",
    "kicker": "INVESTIGATION",
    "title": "读取系统并定位瓶颈",
    "detail": "主 Agent 检查服务架构、运行指标和基准测试结果，识别跨地区数据库访问等可能限制得分的问题，再提出修改方案。",
    "note": "分析与假设需要后续测试验证；一次测量不能证明原因。",
    "diagram": "sequenceDiagram\n    participant P0 as 主Agent\n    participant P1 as 服务\n    participant P2 as 测试工具\n    P0->>P1: 检查代码与架构\n    P0->>P2: 运行基准测试\n    P2->>P0: 返回指标与日志"
  },
  {
    "label": "3 实验和反馈",
    "kicker": "EXPERIMENT",
    "title": "修改、部署并比较结果",
    "detail": "主 Agent 修改实现、部署并重新运行测试，根据功能检查和得分决定保留或回退。复盘报告共执行 86 次基准测试、产生 19 个提交；不是每项变化都能独立解释分数。",
    "note": "例如本地读取和集中写入是一次架构实验；基准测试波动和正确性都需要考虑。",
    "diagram": "sequenceDiagram\n    participant P0 as 主Agent\n    participant P1 as 服务\n    participant P2 as 测试工具\n    P0->>P1: 修改并部署候选方案\n    P0->>P2: 运行测试\n    P2->>P0: 返回正确性与得分\n    P0->>P1: 保留或回退方案"
  },
  {
    "label": "4 子 Agent 审计",
    "kicker": "AUDIT",
    "title": "进展停滞时启动独立检查",
    "detail": "得分长期没有提升时，预先配置的 Hook 提示启动审计子 Agent。子 Agent 对照检查项挑战先前决策、寻找遗漏，然后将发现交还主 Agent 判断。",
    "note": "审计是提供另一视角，不代表每个建议都已验证，也不意味着多个 Agent 同时独立部署。",
    "diagram": "sequenceDiagram\n    participant P0 as 框架\n    participant P1 as 主Agent\n    participant P2 as 审计Agent\n    participant P3 as 服务\n    P0->>P1: 停滞时提示审计\n    P1->>P2: 委派复查\n    P2->>P3: 检查已有决策\n    P2->>P1: 返回发现与建议"
  },
  {
    "label": "5 统计并停止",
    "kicker": "DECISION",
    "title": "用剩余预算和测试波动做决策",
    "detail": "临近结束时，主 Agent 使用预先准备的统计决策工具，结合分数波动、阈值和剩余测试机会判断是否继续。复盘报告最终以 625,857 分停止并夺冠。",
    "note": "相同配置也可能得到不同分数；停止规则是比赛策略，不保证任何一次测试都会提高分数。",
    "diagram": "sequenceDiagram\n    participant P0 as 主Agent\n    participant P1 as 决策工具\n    participant P2 as 服务\n    P0->>P1: 提交测试结果和剩余机会\n    P1->>P0: 返回统计决策依据\n    P0->>P2: 选择停止并保留方案"
  }
];
module.exports = { steps };
