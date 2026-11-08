const actors = `actor U as 用户
    participant B as 浏览器
    participant C as 应用
    participant I as 身份提供方`;
const step = (label, kicker, title, detail, note, messages) => ({ label, kicker, title, detail, note, diagram: `sequenceDiagram\n    ${actors}\n    ${messages}` });
module.exports = { steps: [
  step('1 发起登录', 'REQUEST', '应用发起身份认证请求', '用户选择使用外部账号登录。应用为本次请求生成并保存 state、nonce 和 PKCE 校验值，引导浏览器访问身份提供方的授权端点；请求包含 openid 范围。', '应用事先注册客户端和回调地址，并通过可信配置确定身份提供方的端点和签名密钥。', 'U->>B: 选择外部账号登录\n    B->>C: 请求登录\n    C-->>B: 跳转，携带 openid、state、nonce 和 challenge\n    B->>I: 认证请求'),
  step('2 认证用户', 'AUTHENTICATE', '身份提供方确认用户身份', '身份提供方检查自己的会话；需要时要求用户登录，并根据请求和策略决定是否请求用户同意。成功后生成授权码。', '身份提供方已有有效会话时，用户可能无需再次输入凭据；拒绝或认证失败时不会返回成功的授权码。', 'I-->>B: 按需请求登录或同意\n    U->>B: 提交所需信息\n    B->>I: 传递用户操作'),
  step('3 接收回调', 'CALLBACK', '浏览器带回授权码', '身份提供方将浏览器重定向到应用的回调地址，带回授权码和 state。应用核对 state，并找到本次请求保存的 PKCE 校验值和 nonce。', '收到错误、state 不匹配或找不到对应请求时，应用停止登录，不建立会话。', 'I-->>B: 重定向，携带 code 和 state\n    B->>C: 请求回调地址'),
  step('4 交换令牌', 'TOKEN', '应用用授权码换取令牌', '应用通过令牌端点提交授权码、回调地址和 code_verifier，并按要求进行客户端认证。身份提供方验证请求后返回 ID Token 和访问令牌。', 'PKCE 将授权码绑定到请求；它不替代机密客户端的认证。授权码失效、重复使用或校验失败时交换会失败。', 'C->>I: code、redirect_uri 和 verifier\n    I-->>C: ID Token 和访问令牌'),
  step('5 校验身份', 'VALIDATE', '应用验证 ID Token', '应用使用可信的签名密钥和算法验证 ID Token，并检查签发方 iss、受众 aud、有效期 exp 及本次请求的 nonce 等。通过后，以 iss 和 sub 的组合识别外部身份。', 'nonce 将令牌关联到本次认证请求；签名、声明或 nonce 校验失败时，不应建立应用会话。', 'Note over C: 验证签名、iss、aud、exp 和 nonce\n    Note over C: 使用 iss 与 sub 识别身份'),
  step('6 建立会话', 'SESSION', '应用建立本地登录会话', '应用按自己的账号策略查找或创建本地账号，建立会话并向浏览器设置会话 Cookie。后续请求由应用根据 Cookie 恢复登录状态。', '应用会话与身份提供方会话各自独立；是否自动创建或关联账号由应用决定，不应仅凭未经验证的邮箱关联账号。', 'C-->>B: 设置会话 Cookie\n    B->>C: 后续请求携带 Cookie\n    C-->>B: 返回登录后的页面')
] };
