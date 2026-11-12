module.exports = {
  "steps": [
    {
      "label": "1 读取热门键",
      "kicker": "步骤 1",
      "title": "读取热门键",
      "detail": "请求先查询一个访问频繁的缓存键。值存在且未过期时，应用直接返回，无须访问数据库。",
      "note": "许多请求依赖同一个键时，它就是热门键。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant L as 协调器\n    U->>A: 请求热门数据\nA->>C: 读取缓存键\nC-->>A: 返回缓存值"
    },
    {
      "label": "2 并发请求同时未命中",
      "kicker": "步骤 2",
      "title": "并发请求同时未命中",
      "detail": "缓存键过期或被淘汰后，并发请求可能同时发现未命中。如果每个请求都查询数据库，就会产生重复工作和瞬时流量。",
      "note": "过期是常见原因；缓存淘汰或冷启动也可能造成类似现象。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant L as 协调器\n    U->>A: 并发请求同一个键\nA->>C: 读取缓存键\nC-->>A: 缓存未命中"
    },
    {
      "label": "3 合并回填请求",
      "kicker": "步骤 3",
      "title": "合并回填请求",
      "detail": "应用选出一个请求负责加载数据。其他请求等待这次加载结果；如果策略允许，也可以返回尚可接受的旧值。",
      "note": "进程内 singleflight 不能协调其他实例。分布式锁需要有限等待、过期机制和故障处理。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant L as 协调器\n    A->>L: 加入或创建该键的回填任务\nL-->>A: 选出回填请求\nA->>D: 只查询一次\nD-->>A: 返回数据"
    },
    {
      "label": "4 发布刷新后的数据",
      "kicker": "步骤 4",
      "title": "发布刷新后的数据",
      "detail": "回填请求将新值连同合适的过期时间写入缓存，并通知等待者共享结果。",
      "note": "必要时采用原子发布或 fencing token，避免较慢的旧回填覆盖新数据。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant L as 协调器\n    A->>C: 存储新值并设置 TTL\nA-->>L: 标记回填完成\nL-->>U: 共享加载结果"
    },
    {
      "label": "5 处理数据源故障",
      "kicker": "步骤 5",
      "title": "处理数据源故障",
      "detail": "数据源变慢或不可用时，应用应限制等待时间，并按策略降级，例如在安全时短暂返回旧值；并发上限和背压也能保护数据库。",
      "note": "只有业务允许时才能返回旧数据。锁可以减少重复工作，却不能提升数据库速度。",
      "diagram": "sequenceDiagram\n    actor U as 请求方\nparticipant A as 应用\nparticipant C as 缓存\nparticipant D as 数据库\nparticipant L as 协调器\n    opt 成功加载新值\nA-->>U: 返回刷新后的值\nelse 数据源延迟或不可用\nA-->>U: 返回允许的旧值或受控错误\nend"
    }
  ]
};
