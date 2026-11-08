const steps = [
  {
    label: '1 发起登录', kicker: 'LOGIN', title: '应用引导浏览器前往身份提供方',
    detail: '用户访问应用并选择单点登录。应用保存本次请求的 state 和 PKCE 校验信息，再让浏览器跳转到身份提供方的授权端点。',
    note: '应用须提前注册客户端和回调地址；请求中包含 client_id、redirect_uri、openid 范围及授权码流程参数。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      U->>B: 选择单点登录
      B->>A: 发起登录
      A-->>B: 跳转授权端点
      B->>I: 授权请求` 
  },
  {
    label: '2 验证身份', kicker: 'AUTHENTICATE', title: '身份提供方验证用户',
    detail: '身份提供方检查自己的会话；如果没有可用会话，就要求用户按其认证策略登录。认证成功后，身份提供方可以建立自己的会话。',
    note: '已有身份提供方会话时可能直接继续；是否要求重新认证或用户同意取决于请求和提供方策略。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      I-->>B: 按需展示登录页面
      U->>B: 按需提供认证信息
      B->>I: 提交认证信息
      I-->>B: 认证完成`
  },
  {
    label: '3 返回授权码', kicker: 'CALLBACK', title: '浏览器把授权码带回应用',
    detail: '身份提供方将浏览器重定向到预先登记的应用回调地址，携带一次性的授权码和请求中的 state。应用先核对 state，再处理授权码。',
    note: '授权码不是应用的登录会话；认证被拒绝或 state 不匹配时，应用停止登录。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      I-->>B: 跳转回调地址，携带 code 和 state
      B->>A: 请求回调地址`
  },
  {
    label: '4 交换并校验', kicker: 'TOKEN', title: '应用交换授权码并校验身份',
    detail: '应用服务端将授权码和 PKCE 校验值发给令牌端点，按客户端类型完成认证。身份提供方验证后返回 ID Token 等令牌；应用校验 ID Token 并识别用户。',
    note: 'ID Token 用于向应用传达认证结果；访问令牌用于访问受保护资源，两者用途不同。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      A->>I: 授权码及 PKCE 校验值
      I-->>A: ID Token 和访问令牌`
  },
  {
    label: '5 建立会话', kicker: 'SESSION', title: '应用建立自己的登录会话',
    detail: '应用根据已验证的外部身份查找或创建本地账号，建立本地会话并向浏览器设置会话 Cookie。此后浏览器访问应用时携带该 Cookie。',
    note: '账号创建和关联受应用策略约束；Cookie 应设置 Secure、HttpOnly 和合适的 SameSite 属性。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      A-->>B: 设置会话 Cookie
      B->>A: 后续请求携带 Cookie
      A-->>B: 返回登录后的页面`
  },
  {
    label: '6 退出应用', kicker: 'LOCAL LOGOUT', title: '应用结束本地会话',
    detail: '用户点击退出后，应用使本地会话失效并清除浏览器中的会话 Cookie。后续请求不能再凭这个会话访问应用。',
    note: '此操作本身不会结束身份提供方会话，也不会自动结束其他应用的会话。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      U->>B: 点击退出
      B->>A: 提交退出请求
      A-->>B: 清除 Cookie 并返回退出结果`
  },
  {
    label: '7 可选全局退出', kicker: 'SSO LOGOUT', title: '应用请求身份提供方退出',
    detail: '若配置了身份提供方退出，应用可在本地退出后引导浏览器访问其退出端点。身份提供方结束自己的会话，并可按配置通知其他应用结束对应会话。',
    note: '退出端点、用户确认、返回地址以及跨应用通知都取决于提供方能力与配置；通知其他应用并非必然成功。',
    diagram: `sequenceDiagram
      actor U as 用户
      participant B as 浏览器
      participant A as 应用
      participant I as 身份提供方
      A-->>B: 可选：跳转退出端点
      B->>I: 请求退出
      I-->>B: 可选：返回应用
      B->>A: 可选：访问退出后地址`
  }
];
window.topicData = { steps };
