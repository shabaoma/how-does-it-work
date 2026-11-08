const topics = [
  { url: 'session-cookie.html', label: 'Session Cookie', title: 'Session Cookie 登录', description: '浏览器如何保存会话标识，以及服务器如何恢复登录状态。', category: '身份与登录' },
  { url: 'access-secret-token.html', label: 'Access / Secret', title: 'Access token 与 Secret token', description: '了解访问令牌与秘密令牌如何参与身份验证，以及各自需要保护的边界。', category: '身份与登录' },
  { url: 'email-code.html', label: '邮箱验证码', title: '邮箱验证码登录', description: '从发送验证码到验证身份，了解一次邮箱登录的过程。', category: '身份与登录' },
  { url: '3d-secure.html', label: '3D Secure', title: '3D Secure 在线支付认证', description: '了解在线支付中持卡人认证的参与方与流程。', category: '支付' },
  { url: 'aws-sts.html', label: 'AWS STS', title: 'AWS STS 临时凭证', description: '以跨账户 AssumeRole 为例，了解临时凭证与权限检查。', category: '云服务' }
];
module.exports = topics;
