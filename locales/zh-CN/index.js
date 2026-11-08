const zhContent = require('./content.json');
const zhMetadata = require('./topics.js');
const zhSteps = { sessionCookie: require('./steps/session-cookie'), accessSecretToken: require('./steps/access-secret-token'), sso: require('./steps/sso'), emailCode: require('./steps/email-code'), threeDSecure: require('./steps/3d-secure'), awsSts: require('./steps/aws-sts'), awsIam: require('./steps/aws-iam') };
const zhTopics = Object.fromEntries(Object.keys(zhMetadata).map(key => [key, { ...zhContent[key], ...zhMetadata[key], pageTitle: zhContent[key].title, ...zhSteps[key] }]));
const zh = {
  code: 'zh-CN', prefix: 'zh-CN', name: '简体中文', topics: zhTopics,
  categories: { identity: '身份与登录', payments: '支付', cloud: '云服务' },
  home: { title: '技术原理图解', description: '通过流程图和分步讲解，了解技术如何工作。', lead: '从参与方、数据流和关键边界出发，用流程图和分步讲解理解常见技术。', footer: '页面展示常见流程；具体行为以相关协议和实际实现为准。' },
  ui: { language: '语言', guide: '知识目录', explore: '探索技术原理', count: '个主题', topics: '主题目录', navigation: '主题导航', home: '首页', steps: '分步讲解', flowSteps: '流程步骤', previous: '上一步', next: '下一步', detail: '这一步发生了什么', loading: '正在加载图表…', diagramError: '图表加载失败，请刷新页面重试。', progress: '第 {current} 步 / 共 {total} 步', exploreFlow: '查看流程 →' }
};
module.exports = zh;
