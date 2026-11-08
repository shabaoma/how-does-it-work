module.exports = {
  "steps": [
    {
      "label": "1 建立关注",
      "kicker": "FOLLOW",
      "title": "读者关注作者",
      "detail": "读者提交关注请求，应用检查账号和产品规则后保存关注关系。之后信息流查询可以用这条关系找到作者。",
      "note": "私密账号可能需要先批准关注；屏蔽或取关也会改变可见范围。",
      "diagram": "sequenceDiagram\n    actor R as 读者\n    actor A as 作者\n    participant S as 社交应用\n    participant D as 数据库\n    R->>S: 请求关注作者\n    S->>D: 保存关注关系\n    D-->>S: 保存结果\n    S-->>R: 返回关注结果"
    },
    {
      "label": "2 发布动态",
      "kicker": "PUBLISH",
      "title": "作者发布内容",
      "detail": "作者提交正文、媒体引用和可见范围。应用校验请求并保存动态，成功后返回结果。",
      "note": "媒体上传和处理可以独立进行；发布成功不保证通知或分发已经完成。",
      "diagram": "sequenceDiagram\n    actor R as 读者\n    actor A as 作者\n    participant S as 社交应用\n    participant D as 数据库\n    A->>S: 提交动态和可见范围\n    S->>D: 保存动态\n    D-->>S: 保存结果\n    S-->>A: 返回发布结果"
    },
    {
      "label": "3 请求信息流",
      "kicker": "FEED",
      "title": "读者读取可见动态",
      "detail": "读者打开首页，应用根据关注关系查询候选动态，检查当前权限后按时间排序并返回一页。",
      "note": "本例是读时生成；删除、屏蔽或权限变更可能使先前可见的动态不再可见。",
      "diagram": "sequenceDiagram\n    actor R as 读者\n    actor A as 作者\n    participant S as 社交应用\n    participant D as 数据库\n    R->>S: 请求信息流\n    S->>D: 查询关注关系和候选动态\n    D-->>S: 返回候选数据\n    Note over S: 检查权限并排序\n    S-->>R: 返回一页动态"
    },
    {
      "label": "4 互动与通知",
      "kicker": "INTERACT",
      "title": "读者点赞或评论",
      "detail": "读者对有权访问的动态互动。应用保存点赞或评论，并可按通知策略异步提醒作者。",
      "note": "重复请求或任务重试需要防止重复点赞和重复通知；通知可能延迟或不发送。",
      "diagram": "sequenceDiagram\n    actor R as 读者\n    actor A as 作者\n    participant S as 社交应用\n    participant D as 数据库\n    R->>S: 提交点赞或评论\n    S->>D: 保存互动\n    D-->>S: 保存结果\n    S-->>R: 返回互动结果\n    opt 通知策略允许\n      S->>A: 发送通知\n    end"
    }
  ]
};
