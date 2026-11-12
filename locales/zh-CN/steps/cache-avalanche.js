module.exports = {
  "steps": [
    {
      "label": "1 缓存可用性变化",
      "kicker": "步骤 1",
      "title": "缓存可用性变化",
      "detail": "正常情况下应用从缓存读取数据。缓存整体重启或网络故障会让大量条目同时不可用；相近 TTL 也可能造成大量键一起到期。",
      "note": "排查时要区分缓存故障和集中到期这两种原因。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant G as 保护组件\nparticipant O as 运维\n    U->>A: 发起读取请求\nA->>C: 查询缓存键\nC-->>A: 缓存正常时返回值\nNote over C: 集中过期或缓存不可用"
    },
    {
      "label": "2 未命中流量转向后端",
      "kicker": "步骤 2",
      "title": "未命中流量转向后端",
      "detail": "请求穿透到数据库或其他数据源。大量并发读取可能耗尽连接、CPU 或服务处理能力。",
      "note": "故障时绕过缓存或快速失败会带来不同的可用性和数据影响。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant G as 保护组件\nparticipant O as 运维\n    U->>A: 大量并发读取\nA->>C: 查询多个键\nC-->>A: 未命中或缓存错误\nA->>D: 后端读取增加"
    },
    {
      "label": "3 保护后端服务",
      "kicker": "步骤 3",
      "title": "保护后端服务",
      "detail": "应用限制并发任务和请求速率。数据源不健康时，熔断器可暂时停止调用，背压则限制排队工作量。",
      "note": "熔断器用于限制压力，不能在数据源不可用时变出数据。没有安全降级方式时应返回受控错误。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant G as 保护组件\nparticipant O as 运维\n    A->>G: 限制并发与请求速率\nG->>D: 放行有限读取\nD-->>G: 返回容量或健康状态\nG-->>A: 放行、延迟或拒绝"
    },
    {
      "label": "4 逐步恢复缓存",
      "kicker": "步骤 4",
      "title": "逐步恢复缓存",
      "detail": "运维团队恢复缓存容量，系统再逐步回填重要键。随机化 TTL 和分阶段预热可以减少集中到期和重启负载。",
      "note": "只预热经过评估的重要键，并限制速率。随机抖动不能单独解决缓存整体故障。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant G as 保护组件\nparticipant O as 运维\n    O->>C: 恢复缓存服务\nA->>C: 逐步回填高优先级键\nA->>C: 设置随机抖动后的 TTL"
    },
    {
      "label": "5 观察并恢复流量",
      "kicker": "步骤 5",
      "title": "观察并恢复流量",
      "detail": "团队观察数据库与缓存状态，逐步恢复正常流量，并确认降级策略仍符合业务要求。",
      "note": "熔断器关闭后不要让所有等待请求同时涌回；应逐步恢复并持续观察负载。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant G as 保护组件\nparticipant O as 运维\n    O->>D: 监控数据源健康状态\nO->>C: 监控缓存恢复状态\nG-->>A: 逐步恢复流量\nA-->>U: 恢复正常响应"
    }
  ]
};
