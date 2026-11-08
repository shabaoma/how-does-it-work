// 复制到各语言的 locales/<语言>/steps/ 中，替换全部占位内容，
// 再在该语言的 index.js 中按 topics.js 的主题 key 关联文件。
// 标题、导语、整体图、补充卡片和页脚分别维护在该语言的 topics.js 与 content.json。
module.exports = {
  steps: [
    {
      label: 'STEP_1_LABEL',
      kicker: 'STEP_1_KICKER',
      title: 'STEP_1_TITLE',
      detail: 'STEP_1_DETAIL',
      note: 'STEP_1_NOTE',
      diagram: `sequenceDiagram
        actor U as USER
        participant C as CLIENT
        participant S as SERVER
        U->>C: USER_ACTION
        C->>S: REQUEST`
    },
    {
      label: 'STEP_2_LABEL',
      kicker: 'STEP_2_KICKER',
      title: 'STEP_2_TITLE',
      detail: 'STEP_2_DETAIL',
      note: 'STEP_2_NOTE',
      diagram: `sequenceDiagram
        participant C as CLIENT
        participant S as SERVER
        S-->>C: RESPONSE`
    }
  ]
};
