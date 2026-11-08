const steps = [
  {label:'1 提交支付', kicker:'CHECKOUT', title:'持卡人发起网上支付', detail:'持卡人在商户页面提交卡片和订单信息。商户或支付服务商准备 3DS 认证请求，并按接入方式收集交易、浏览器或设备等必要信息。', note:'信息用于认证和风险判断；具体字段与收集方式取决于协议版本和支付服务商。', diagram:`sequenceDiagram
    actor U as 持卡人
    participant M as 商户页面
    participant P as 支付服务商
    U->>M: 提交卡片和订单
    M->>P: 发起支付并准备认证
    P->>P: 收集交易和设备信息`},
  {label:'2 请求认证', kicker:'AUTHENTICATION REQUEST', title:'请求经过卡组织到达发卡银行', detail:'3DS 服务将认证请求经卡组织目录服务器（DS）路由至发卡银行的访问控制服务器（ACS）。ACS 结合收到的数据和银行自身信息评估风险。', note:'3DS 服务、DS 和 ACS 分别连接商户侧、卡组织和发卡行侧；ACS 决定如何处理认证。', diagram:`sequenceDiagram
    participant S as 3DS 服务
    participant D as 目录服务器 DS
    participant A as 发卡行 ACS
    S->>D: 认证请求 AReq
    D->>A: 路由认证请求
    A->>A: 评估交易和设备风险
    A-->>D: 认证响应 ARes
    D-->>S: 返回响应`},
  {label:'3 银行判断', kicker:'FRICTIONLESS / CHALLENGE', title:'无感通过，或要求进一步验证', detail:'银行可能直接给出无感认证结果；如果需要进一步确认，则发起交互认证。用户按照银行要求在页面或银行 App 中完成验证，ACS 再返回认证结果。', note:'交互可能成功、失败或被用户中断；银行也可能返回其他认证状态。', diagram:`sequenceDiagram
    participant S as 3DS 服务
    participant A as 发卡行 ACS
    actor U as 持卡人
    alt 无感认证
      A-->>S: 返回认证结果
    else 需要交互认证
      A-->>S: 要求进一步验证
      A->>U: 展示验证或请求 App 确认
      U->>A: 完成或取消验证
      A-->>S: 返回最终认证结果
    end`},
  {label:'4 提交授权', kicker:'PAYMENT AUTHORISATION', title:'认证结果用于后续支付授权', detail:'商户或支付服务商根据认证状态和适用规则决定如何继续。需要发起支付时，经收单方和支付网络向发卡银行提交授权请求，并按要求携带或关联认证数据。', note:'认证失败、不可用或中断时，是否继续以及如何处理取决于适用规则和支付服务商的接入方式。', diagram:`sequenceDiagram
    participant M as 商户 / 支付服务商
    participant N as 收单方 / 支付网络
    participant I as 发卡银行
    M->>N: 授权请求及适用的认证数据
    N->>I: 转发授权请求
    I->>I: 判断余额、限额和风险
    I-->>N: 批准或拒绝
    N-->>M: 返回授权结果`},
  {label:'5 显示结果', kicker:'PAYMENT RESULT', title:'商户向持卡人展示结果', detail:'发卡银行批准授权后，商户按支付服务商的结果继续订单处理；如果授权被拒绝，商户提示用户并提供适当的重试或其他支付方式。', note:'授权批准与最终清算、资金到账并不是同一个步骤；它们通常在后续处理。', diagram:`sequenceDiagram
    participant I as 发卡银行
    participant P as 支付服务商
    participant M as 商户
    actor U as 持卡人
    I-->>P: 授权结果
    P-->>M: 通知支付结果
    M-->>U: 显示成功或失败`}
];

module.exports = { steps };
