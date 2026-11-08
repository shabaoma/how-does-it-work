const steps = [
  {
    id: "login",
    label: "1 登录",
    kicker: "POST /login",
    title: "先证明身份",
    detail: "客户端把用户的登录凭证交给认证服务器。这一步还没有 access token，也没有 secret token。认证服务器核对通过之后才发证。",
    callout: "密码停在这一次登录请求里，不会被放进后来的业务请求。",
    live: [],
    diagram: `sequenceDiagram
      actor App as 客户端
      participant Auth as 认证服务器
      App->>Auth: POST /login
      Note right of Auth: 账号和密码
      Auth-->>App: 核对中`
  },
  {
    id: "issue",
    label: "2 发证",
    kicker: "两张令牌",
    title: "一次发出两张，用途分开",
    detail: "认证服务器返回 access token 和 secret token，并在自己这边记下它们对应的用户、权限和过期时间。access token 寿命短，secret token 寿命长。客户端把 secret token 放在只有自己能读的存储里。",
    callout: "点下面的卡片，看这张令牌会发给谁。",
    live: ["access", "secret"],
    diagram: `sequenceDiagram
      actor App as 客户端
      participant Auth as 认证服务器
      Auth-->>App: access token，短期
      Auth-->>App: secret token，长期
      Note right of App: secret token 单独收好`
  },
  {
    id: "call",
    label: "3 调用",
    kicker: "Authorization: Bearer",
    title: "业务请求只带 access token",
    detail: "客户端访问业务服务器时，把 access token 放进 Authorization: Bearer。业务服务器检查这张令牌的签名、是否过期、权限是否覆盖这次操作。secret token 留在客户端，不出现在这个请求里。",
    callout: "业务服务器认的是 access token。它不接受拿 secret token 来代替。",
    live: ["access", "secret"],
    diagram: `sequenceDiagram
      actor App as 客户端
      participant API as 业务服务器
      App->>API: Authorization Bearer access token
      Note right of API: 请求里没有 secret token
      API-->>App: 业务数据`
  },
  {
    id: "refresh",
    label: "4 续期",
    kicker: "用 secret token 换发",
    title: "过期后只拿 secret token 去换",
    detail: "access token 过期后，客户端把 secret token 交给认证服务器。认证服务器确认这张仍有效，就发一张新的 access token。很多实现会同时换发新的 secret token，旧的随即作废，避免同一张被重复使用。",
    callout: "续期请求打到认证服务器。业务服务器不参与换发。",
    live: ["secret"],
    diagram: `sequenceDiagram
      actor App as 客户端
      participant Auth as 认证服务器
      App->>Auth: 提交 secret token
      Auth-->>App: 新的 access token
      opt 系统启用轮换
        Auth-->>App: 轮换后的 secret token
      end`
  },
  {
    id: "logout",
    label: "5 登出",
    kicker: "注销 secret token",
    title: "让 secret token 不能再换发",
    detail: "登出时客户端请认证服务器注销这张 secret token。之后再用它换发会被拒绝。已经发出、尚未过期的 access token 仍能用到自己的过期时间，所以 access token 的寿命要短。",
    callout: "停掉登录，靠的是认证服务器拒绝这张 secret token。",
    live: ["access", "secret"],
    diagram: `sequenceDiagram
      actor App as 客户端
      participant Auth as 认证服务器
      App->>Auth: 注销 secret token
      Auth-->>App: 不能再换发
      Note right of App: 旧 access token 留到自己过期`
  }
];

const tokenMeta = {
  access: { name: "access token", hint: "放进 Authorization: Bearer，发给业务服务器", state: "live" },
  secret: { name: "secret token", hint: "只交给认证服务器，用来换发", state: "secret" }
};

const tokenDetails = {
    access: "业务服务器看到的是这张短期令牌。过期、签名不对或权限不够，这次调用就停在业务服务器。",
    secret: "这张只在换发和注销时交给认证服务器。它能持续换出新的 access token，所以要放在别人读不到的地方，并且允许服务器把它作废。"
  };
module.exports = { steps, tokenMeta, tokenDetails, warningToken: "secret", warningStep: 3, keyboardNavigation: true };
