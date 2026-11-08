// 按 topics.js 中的主题 key，在每种语言的数据中提供完整内容。
module.exports = {
  label: '主题名称',
  title: '主题标题',
  description: '首页和导航简介。',
  lead: '介绍问题、参与方和关键边界。',
  overviewKicker: 'OVERVIEW',
  overviewTitle: '整体流程',
  overview: `flowchart LR
    U[用户] -->|发起操作| C[客户端]
    C -->|发送请求| S[服务端]
    S -->|返回结果| C`,
  overviewNote: '说明整体流程的范围或边界。',
  steps: [{
    label: '1 发起请求', kicker: 'REQUEST', title: '客户端发送请求',
    detail: '用户在客户端发起操作，客户端将请求发送给服务端。',
    note: '说明条件或限制。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant C as 客户端
      participant S as 服务端
      U->>C: 发起操作
      C->>S: 发送请求`
  }],
  supplement: '<section class="panel supplement"><h2>关键边界</h2><p>说明限制或失败分支。</p></section>',
  footer: '说明适用范围。'
};

