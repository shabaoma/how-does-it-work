const steps = [
  {
    id: "submit",
    label: "1 提交",
    kicker: "POST /login",
    title: "这时还没有 cookie",
    detail: "浏览器把账号和密码放在请求体里送出。Cookie 头是空的。服务器只做校验，登录状态要等校验通过才会出现。",
    callout: "密码只在这一次请求里出现，不会写进 cookie。",
    live: [],
    diagram: `sequenceDiagram
      actor Browser as 浏览器
      participant S as 服务器
      Browser->>S: POST /login
      Note right of S: body: 账号 + 密码
      S-->>Browser: 校验中，尚无 Set-Cookie`
  },
  {
    id: "create",
    label: "2 建立 session",
    kicker: "Set-Cookie",
    title: "服务器记下这次登录",
    detail: "校验通过后，服务器生成一个猜不到的 sid，在 session 存储里写入 sid → 用户 id 和过期时间。响应头带上 Set-Cookie。sid 是查表用的编号，用户资料留在服务器。",
    callout: "同一账号在另一台浏览器登录，会得到另一个 sid，对应另一条 session。",
    live: ["session", "sid"],
    diagram: `sequenceDiagram
      actor Browser as 浏览器
      participant S as 服务器
      participant DB as Session 存储
      Browser->>S: POST /login 校验通过
      S->>DB: 保存 sid → 用户、过期时间
      S-->>Browser: Set-Cookie sid、HttpOnly、Secure`
  },
  {
    id: "store",
    label: "3 浏览器保存",
    kicker: "Cookie 罐",
    title: "浏览器收下，脚本拿不到",
    detail: "浏览器按 Domain、Path、Max-Age 把 sid 放进 cookie 罐。标了 HttpOnly 时，document.cookie 读不到它，页面脚本也不能把它抄进别的头。接下来同站请求由浏览器自己附上。",
    callout: "页面不用把 sid 存进 localStorage。交给浏览器保管，才能自动带回。",
    live: ["sid", "attrs"],
    diagram: `sequenceDiagram
      actor Browser as 浏览器
      participant Jar as Cookie 罐
      participant S as 服务器
      S-->>Browser: Set-Cookie
      Browser->>Jar: 按域名、路径、过期时间保存
      Note right of Jar: HttpOnly，脚本读不到`
  },
  {
    id: "reuse",
    label: "4 后续请求",
    kicker: "Cookie: sid=...",
    title: "浏览器自动带回，服务器查表",
    detail: "再访问同站页面或接口时，浏览器发现域名和路径匹配、cookie 未过期，就自动加上 Cookie: sid=...。服务器用这个 sid 查出用户。查不到、过期、或 session 已被删，就当作未登录。业务数据仍从服务器的 session 来，不从 cookie 里拆。",
    callout: "匹配的 cookie 会跟着请求走，页面不用自己计算签名，也不用把它抄进 Authorization。",
    live: ["session", "sid"],
    diagram: `sequenceDiagram
      actor Browser as 浏览器
      participant S as 服务器
      participant DB as Session 存储
      Browser->>S: GET /home
      Note right of S: Cookie: sid=...
      S->>DB: 用 sid 查用户
      DB-->>S: 用户 id
      S-->>Browser: 已登录的内容`
  },
  {
    id: "logout",
    label: "5 登出",
    kicker: "Max-Age=0",
    title: "先删服务器记录，再清 cookie",
    detail: "登出请求本身也带着 cookie，服务器才知道删哪一条。删掉 session 之后，旧 sid 再被带上来也查不到人。响应再发 Set-Cookie: sid=; Max-Age=0，浏览器随即丢掉这份 cookie。只清浏览器、不删服务器的话，别人若还持有这个 sid，在过期前仍然对应着那次登录。",
    callout: "让登录失效的是服务器上的那条 session。cookie 过期只是浏览器不再送出这个编号。",
    live: ["session", "sid"],
    diagram: `sequenceDiagram
      actor Browser as 浏览器
      participant S as 服务器
      participant DB as Session 存储
      Browser->>S: POST /logout
      Note right of S: Cookie: sid=...
      S->>DB: 删除这条 sid
      S-->>Browser: Set-Cookie sid 为空，Max-Age=0`
  }
];

const tokenMeta = {
  session: { name: "session 记录", hint: "只在服务器：sid → 用户、过期时间", state: "secret" },
  sid: { name: "sid cookie", hint: "Set-Cookie 发下，之后以 Cookie 头回到服务器", state: "live" },
  attrs: { name: "HttpOnly / Secure / SameSite", hint: "决定谁能读、走不走 HTTPS、跨站带不带", state: "live" }
};

const tokenDetails = {
    session: "登录状态以服务器这条记录为准。sid 还在浏览器里，但记录已删除或过期，请求就是未登录。",
    sid: "cookie 的值是随机编号。拿到它的人在过期前可以带着同一个 Cookie 头访问，所以要走 HTTPS，并尽快在登出时删掉服务器记录。",
    attrs: "HttpOnly 挡住页面脚本读取。Secure 限制为 HTTPS。SameSite=Lax 时，从别的网站点过来的普通跳转会带上 cookie，别的网站用表单或脚本偷偷发起的请求则不带。"
  };
window.topicData = { steps, tokenMeta, tokenDetails, warningToken: "sid", warningStep: 4, keyboardNavigation: true };
