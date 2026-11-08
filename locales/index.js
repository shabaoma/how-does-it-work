const topics = require('../topics.js');
const zh = {
  code: 'zh-CN', prefix: '', name: '简体中文', topics,
  ui: { language: '语言', guide: '知识目录', explore: '探索技术原理', count: '个主题', topics: '主题目录', navigation: '主题导航', home: '首页', steps: '分步讲解', flowSteps: '流程步骤', previous: '上一步', next: '下一步', detail: '这一步发生了什么', loading: '正在加载图表…', diagramError: '图表加载失败，请刷新页面重试。', progress: '第 {current} 步 / 共 {total} 步' }
};
const en = {
  code: 'en', prefix: 'en', name: 'English', topics: require('./en-topics.js'),
  home: { title: 'How technology works', description: 'Understand technology through diagrams and step-by-step explanations.', lead: 'Explore common technologies through their participants, data flows, and key boundaries.', footer: 'These pages illustrate common flows; consult the relevant protocols and implementations for actual behavior.' },
  ui: { language: 'Language', guide: 'GUIDE', explore: 'Explore topics', count: 'topics', topics: 'Topics', navigation: 'Topics', home: 'Home', steps: 'Step by step', flowSteps: 'Flow steps', previous: 'Previous', next: 'Next', detail: 'What happens in this step', loading: 'Loading diagram…', diagramError: 'The diagram could not be loaded. Please refresh and try again.', progress: 'Step {current} of {total}', overview: 'Overview', boundaries: 'Key boundaries', exploreFlow: 'Explore the flow →' }
};
module.exports = [zh, en];
