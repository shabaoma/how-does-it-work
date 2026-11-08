const steps = [
  {label:'1 输入邮箱', kicker:'POST /auth/email/start', title:'请求发送验证码', detail:'用户输入邮箱，客户端通过 HTTPS 提交。认证服务检查发送频率，生成随机验证码，并将与邮箱及登录用途关联的校验信息和过期时间写入临时存储。', note:'返回统一提示，例如“如果该邮箱符合登录条件，我们会发送验证码”，避免直接暴露账号是否存在。', diagram:`sequenceDiagram
    actor U as 用户
    participant B as 浏览器
    participant A as 认证服务
    participant R as 验证码存储
    U->>B: 输入邮箱
    B->>A: 提交邮箱
    A->>A: 限流并生成随机验证码
    A->>R: 保存校验值、期限和次数
    A-->>B: 返回统一提示`},
  {label:'2 发送邮件', kicker:'EMAIL DELIVERY', title:'通过邮件把验证码交给用户', detail:'认证服务通过 SMTP 或邮件服务商 API 发送邮件。邮件服务负责投递，用户打开邮箱后读取验证码。', note:'发送接口返回成功通常表示邮件已被服务商接收，并不保证邮件已经送达用户收件箱。', diagram:`sequenceDiagram
    participant A as 认证服务
    participant M as 邮件服务商
    participant E as 用户邮箱
    actor U as 用户
    A->>M: 请求发送验证码邮件
    M-->>A: 接收发送请求
    M->>E: 投递邮件
    U->>E: 查看验证码`},
  {label:'3 验证并登录', kicker:'POST /auth/email/verify', title:'校验一次性验证码', detail:'用户在原页面输入邮箱验证码。服务端检查邮箱和用途是否匹配、是否过期、尝试次数是否超限；校验成功后原子消费验证码，查找账号并创建登录会话。', note:'错误、过期、已使用或超过尝试次数都不能登录。是否为新邮箱创建账号取决于产品策略。', diagram:`sequenceDiagram
    actor U as 用户
    participant B as 浏览器
    participant A as 认证服务
    participant R as 验证码存储
    participant D as 用户数据库
    participant S as Session 存储
    U->>B: 输入验证码
    B->>A: 提交邮箱和验证码
    A->>R: 校验并原子消费
    A->>D: 查找账号
    A->>S: 创建新会话
    A-->>B: Set-Cookie: session id`},
  {label:'4 访问业务', kicker:'AUTHENTICATED REQUEST', title:'之后用会话访问业务', detail:'浏览器后续请求携带 Session Cookie；业务服务查询会话，确认用户和权限后处理请求。验证码已经完成使命，不需要在每次请求中重复发送。', note:'登出时服务端撤销会话，并让浏览器清除 Cookie。', diagram:`sequenceDiagram
    participant B as 浏览器
    participant API as 业务服务
    participant S as Session 存储
    B->>API: 请求 + Cookie
    API->>S: 查询 session id
    S-->>API: 用户身份和会话状态
    API-->>B: 返回业务数据`}
];

module.exports = { steps };
