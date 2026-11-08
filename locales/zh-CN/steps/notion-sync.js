module.exports = {
  "steps": [
    {
      "label": "1 下载页面",
      "kicker": "DOWNLOAD",
      "title": "设备下载离线页面",
      "detail": "设备 A 将页面标记为可离线使用，客户端下载渲染页面所需的记录并保存在本地持久存储中。",
      "note": "下载设置是设备级的；需要离线使用的另一台设备也要准备相应页面。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    A->>S: 请求页面及所需记录\n    S-->>A: 返回页面数据\n    Note over A: 保存到本地存储"
    },
    {
      "label": "2 本地编辑",
      "kicker": "EDIT",
      "title": "设备在离线时保存修改",
      "detail": "断网后，用户仍可在设备 A 上编辑已下载页面。客户端将修改保存在本地，等待网络恢复后同步。",
      "note": "离线修改尚未到达服务，其他设备此时不能看到它。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    Note over A: 离线编辑并保存修改"
    },
    {
      "label": "3 重连提交",
      "kicker": "UPLOAD",
      "title": "设备重连并同步修改",
      "detail": "设备 A 恢复连接后，将离线修改同步到服务。服务处理修改，使页面状态可以被其他设备获取。",
      "note": "如果有并发修改，文本和非文本内容的冲突处理不同，不能假设所有修改都会保留。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    A->>S: 同步离线修改\n    S-->>A: 同步结果"
    },
    {
      "label": "4 通知与拉取",
      "kicker": "FETCH",
      "title": "另一设备收到通知并拉取",
      "detail": "服务应用一批页面更新后发布页面通知。已订阅该离线页面的在线设备 B 收到通知，再请求最新变更并更新本地数据。",
      "note": "通知用于提示页面发生变化；设备 B 需要联网才能接收并拉取。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    S->>B: 页面更新通知\n    B->>S: 请求最新变更\n    S-->>B: 返回页面变更\n    Note over B: 更新本地数据"
    },
    {
      "label": "5 重连追赶",
      "kicker": "CATCH UP",
      "title": "离线设备检查页面版本",
      "detail": "如果设备 B 在更新时离线，重连后会比较每个离线页面的本地下载时间和服务端更新时间，只拉取服务端较新的页面。",
      "note": "这是 Notion 公开描述的离线页面追赶方式，不表示所有页面或客户端都采用相同机制。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    B->>S: 检查页面更新时间\n    S-->>B: 返回版本时间\n    opt 服务端页面较新\n      B->>S: 请求最新页面\n      S-->>B: 返回页面数据\n    end"
    },
    {
      "label": "6 合并并发编辑",
      "kicker": "MERGE",
      "title": "文本并发修改可以合并",
      "detail": "不同设备同时编辑文本时，Notion 使用无冲突复制数据类型（CRDT）支持富文本并发编辑，包括跨块拆分和合并。同步后客户端可收敛到合并结果。",
      "note": "CRDT 不意味着所有非文本字段都能无损合并；发生冲突后应检查最终内容。",
      "diagram": "sequenceDiagram\n    participant A as 设备 A\n    participant S as Notion 服务\n    participant B as 设备 B\n    A->>S: 提交文本修改 A\n    B->>S: 提交并发文本修改 B\n    Note over S: 合并文本修改\n    B->>S: 拉取合并结果\n    S-->>B: 返回合并结果"
    }
  ]
};
