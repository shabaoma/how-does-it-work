const actors = `actor U as 用户
    participant B as 浏览器
    participant C as 客户端应用
    participant A as 授权服务器
    participant R as 资源服务器`;
const step = (label, kicker, title, detail, note, messages) => ({ label, kicker, title, detail, note, diagram: `sequenceDiagram\n    ${actors}\n    ${messages}` });
module.exports = { steps: [
  step('1 准备请求', 'PREPARE', '客户端生成校验值', '用户请求应用访问受保护资源。客户端为本次授权生成随机 code_verifier，保存它及 state，并用 S256 计算 code_challenge。', '校验值须与本次浏览器会话绑定；每次授权都应使用新的高熵随机值。', 'U->>B: 请求连接资源\n    B->>C: 开始授权\n    Note over C: 保存 verifier 和 state，计算 challenge'),
  step('2 请求授权', 'AUTHORIZE', '浏览器前往授权服务器', '客户端引导浏览器访问授权端点，发送 client_id、回调地址、请求的 scope、state 和 code_challenge，方法指定为 S256。', '授权服务器校验客户端和回调地址；客户端事先注册回调地址。', 'C-->>B: 跳转授权端点\n    B->>A: 授权请求及 challenge'),
  step('3 用户授权', 'CONSENT', '授权服务器处理用户授权', '授权服务器按需认证用户，并根据已有授权及其策略决定是否展示授权页面。用户同意后，服务器生成与 challenge 关联的授权码。', '用户拒绝或认证失败时，不会进入成功的授权码交换；具体交互由授权服务器决定。', 'A-->>B: 按需请求登录及同意\n    U->>B: 登录并同意授权\n    B->>A: 提交结果'),
  step('4 返回授权码', 'CALLBACK', '浏览器将授权码带回客户端', '授权服务器将浏览器重定向至回调地址，携带授权码和 state。客户端核对 state，并找到本次请求保存的 verifier。', '授权码有效期短且只能使用一次；state 不匹配或收到错误时应停止流程。', 'A-->>B: 重定向，携带 code 和 state\n    B->>C: 请求回调地址'),
  step('5 交换令牌', 'TOKEN', '客户端用授权码和 verifier 换取令牌', '客户端向令牌端点提交授权码、回调地址和 code_verifier。授权服务器按 S256 重新计算 challenge 并比较，其他校验也通过后签发访问令牌。', '机密客户端还需按要求完成客户端认证；PKCE 不替代客户端认证。校验失败则不签发令牌。', 'C->>A: code、redirect_uri 和 verifier\n    Note over A: 计算并比较 challenge\n    A-->>C: 访问令牌'),
  step('6 访问资源', 'RESOURCE', '客户端使用访问令牌', '客户端向资源服务器发送访问令牌。资源服务器验证令牌及所需权限，通过后返回受保护资源。', '访问令牌可能是 Bearer 令牌，应防止泄露；是否签发刷新令牌由授权服务器和请求决定。', 'C->>R: 请求资源及访问令牌\n    R-->>C: 受保护资源\n    C-->>B: 展示结果')
] };
