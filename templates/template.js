const steps = [
  {
    label: '1 发起请求', kicker: 'REQUEST', title: '客户端发送请求',
    detail: '用户在客户端发起操作，客户端将请求发送给服务端。',
    note: '在这里说明这一动作的条件或限制。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant C as 客户端
      participant S as 服务端
      U->>C: 发起操作
      C->>S: 发送请求`
  },
  {
    label: '2 返回结果', kicker: 'RESPONSE', title: '服务端处理并返回结果',
    detail: '服务端处理请求，必要时读取数据，然后把结果返回客户端。',
    note: '在这里说明失败分支或实现差异。',
    diagram: `sequenceDiagram
      participant C as 客户端
      participant S as 服务端
      participant D as 数据存储
      S->>D: 读取数据
      D-->>S: 返回数据
      S-->>C: 返回处理结果`
  }
];

/* 整体图和步骤图共享主题；关闭自动缩放，让窄屏容器横向滚动。 */
mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'strict',
  theme: 'base',
  flowchart: { useMaxWidth: false },
  sequence: { useMaxWidth: false },
  themeVariables: {
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Songti SC", serif',
    background: '#fffdf8', primaryColor: '#e5f3eb', primaryTextColor: '#1c2430',
    primaryBorderColor: '#1f6b4a', lineColor: '#1f6b4a', signalColor: '#1c2430',
    signalTextColor: '#1c2430', noteBkgColor: '#e7f0fa', noteTextColor: '#1d4e89',
    noteBorderColor: '#9db7d6', actorBkg: '#fffdf8', actorBorder: '#1f6b4a',
    actorTextColor: '#1c2430'
  }
});

window.topicData = { steps };
