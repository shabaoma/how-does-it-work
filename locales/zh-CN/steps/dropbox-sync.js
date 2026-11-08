module.exports = {
  "steps": [
    {
      "label": "1 保存文件",
      "kicker": "SAVE",
      "title": "电脑 A 发现本地修改",
      "detail": "用户在电脑 A 的 Dropbox 文件夹中保存文件。运行中的客户端发现本地文件变化，准备将新内容和文件状态同步到云端。",
      "note": "文件必须位于同步范围内；客户端停止运行或无法读取文件时，上传可能延迟。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    Note over A: 保存文件并发现变化"
    },
    {
      "label": "2 上传数据块",
      "kicker": "UPLOAD",
      "title": "客户端上传所需数据块",
      "detail": "客户端将文件内容组织为数据块，并与服务交换同步信息，传输完成同步所需的数据。Dropbox 公开描述的数据块最大为 4 MiB，文件尾块可能更小。",
      "note": "数据块传输可以减少数据量，但不能保证每次只传输实际编辑的几个字节。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    A->>S: 上传所需文件数据块\n    S-->>A: 接收结果"
    },
    {
      "label": "3 提交文件状态",
      "kicker": "COMMIT",
      "title": "服务记录文件的新状态",
      "detail": "所需数据块可用后，客户端提交文件状态；服务更新文件元数据，使新的文件版本可供其他设备获取。",
      "note": "文件名、大小等元数据和文件内容数据块是不同的同步内容；上传开始不等于同步已经完成。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    A->>S: 提交文件状态\n    S-->>A: 确认文件状态"
    },
    {
      "label": "4 通知并查询",
      "kicker": "DISCOVER",
      "title": "另一台电脑查询变更",
      "detail": "服务通知在线的电脑 B 有更新。电脑 B 查询自上次同步位置之后的变化，了解文件被创建、修改、移动或删除。",
      "note": "Dropbox 的历史公开架构使用长轮询通知和游标查询；具体客户端实现可能变化。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    S->>B: 通知有更新\n    B->>S: 查询同步位置之后的变更\n    S-->>B: 返回文件变更"
    },
    {
      "label": "5 获取文件",
      "kicker": "DOWNLOAD",
      "title": "电脑 B 获取所需数据",
      "detail": "电脑 B 根据文件状态获取需要的数据块，并将新版本写入本地，随后用户就能在这台电脑上打开更新后的文件。",
      "note": "选择性同步和仅在线设置会影响内容是否下载到本地；仅在线文件可能在打开时才下载。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    B->>S: 请求所需数据块\n    S-->>B: 返回数据块\n    Note over B: 更新本地文件"
    },
    {
      "label": "6 离线与冲突",
      "kicker": "CONFLICT",
      "title": "重连后同步并处理冲突",
      "detail": "设备离线时，修改先留在本地；重连后客户端再与云端同步。如果两台设备在同步前都修改了同一普通文件，Dropbox 可能创建冲突副本，供用户比较和手动合并。",
      "note": "数据块传输不等于文件内容的语义合并；确认同步状态后再处理或删除冲突副本。",
      "diagram": "sequenceDiagram\n    participant A as 电脑 A\n    participant S as Dropbox 服务\n    participant B as 电脑 B\n    Note over A: 离线修改文件\n    Note over B: 同时修改同一文件\n    B->>S: 同步修改\n    A->>S: 重连并同步修改\n    S-->>A: 出现冲突副本"
    }
  ]
};
