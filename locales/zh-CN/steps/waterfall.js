module.exports = {
  "steps": [
    {
      "label": "1 确认需求基线",
      "kicker": "步骤 1",
      "title": "确认需求基线",
      "detail": "业务方与团队明确范围、约束和可衡量的验收标准。评审后的需求基线为后续设计与验证提供共同依据。",
      "note": "基线用于控制变更，不代表需求已经完全正确或不会遗漏。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nS->>D: 提出需求与约束\nD-->>S: 需求说明与验收标准\nS->>D: 确认需求基线"
    },
    {
      "label": "2 设计并评审方案",
      "kicker": "步骤 2",
      "title": "设计并评审方案",
      "detail": "开发团队把需求转化为架构、接口、数据模型和测试策略。在实现前通过设计评审检查可行性，以及设计与需求的对应关系。",
      "note": "必要时用原型验证高风险假设，不应把所有风险都留到最后测试时才发现。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nD->>D: 设计架构与接口\nD->>T: 评审可测试性与验证计划\nT-->>D: 反馈评审问题\nD->>D: 记录评审后的设计"
    },
    {
      "label": "3 实现并集成系统",
      "kicker": "步骤 3",
      "title": "实现并集成系统",
      "detail": "开发人员按照设计实现组件，进行代码评审和单元测试，再集成为有版本标识的构建，交给测试团队验证。",
      "note": "开发过程中就需要测试，后续有验证阶段并不意味着编码结束后才开始测试。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nD->>D: 编码、评审与单元测试\nD->>D: 集成各组件\nD->>T: 交付带版本的构建"
    },
    {
      "label": "4 对照需求验证",
      "kicker": "步骤 4",
      "title": "对照需求验证",
      "detail": "测试团队对集成后的系统开展功能与质量验证。缺陷返回开发团队修复并回归测试；若问题涉及需求或设计，则需要重新评审相应内容。",
      "note": "测试通过表示满足已检查的标准，不能证明系统不存在任何缺陷。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nT->>T: 执行集成测试与系统测试\nopt 发现缺陷\nT->>D: 报告缺陷\nD-->>T: 提交修复版本\nT->>T: 复测与回归测试\nend\nT-->>S: 提交验证结果"
    },
    {
      "label": "5 验收并发布",
      "kicker": "步骤 5",
      "title": "验收并发布",
      "detail": "业务方根据验收标准检查证据。满足验收与发布条件后，运维团队按照上线和恢复方案部署批准的版本。",
      "note": "验收与生产部署是两个决策；评审不通过时需要返回相关工作进行修正。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nS->>T: 核对验收标准\nT-->>S: 提供验收证据\nS->>O: 批准已验收版本发布\nD->>O: 交付构建与部署说明\nO->>O: 部署并检查服务"
    },
    {
      "label": "6 维护并评估变更",
      "kicker": "步骤 6",
      "title": "维护并评估变更",
      "detail": "运维团队收集故障和新增需求。开发团队评估对需求、成本、进度、设计和测试的影响；变更获批后，重新进入受影响的阶段。",
      "note": "可以修改需求，但后期变更可能带来较多返工和重新审批。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant D as 开发团队\nparticipant T as 测试团队\nparticipant O as 运维团队\nO->>D: 提交故障与变更请求\nD-->>S: 提交影响评估\nS->>D: 批准或推迟变更\nopt 变更获批\nD->>D: 返回受影响的阶段\nend"
    }
  ]
};
