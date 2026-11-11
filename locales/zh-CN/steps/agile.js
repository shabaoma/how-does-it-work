module.exports = {
  "steps": [
    {
      "label": "1 明确产品目标",
      "kicker": "步骤 1",
      "title": "明确产品目标",
      "detail": "业务方与产品负责人明确要解决的问题和期望结果。产品负责人为产品待办列表排序，让团队聚焦有价值的工作和已知风险。",
      "note": "待办列表会持续变化，不代表其中每一项都已承诺交付。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nS->>P: 提出需求与反馈\nP->>D: 产品目标与有序待办列表\nD-->>P: 反馈可行性与风险"
    },
    {
      "label": "2 计划小步交付",
      "kicker": "步骤 2",
      "title": "计划小步交付",
      "detail": "Scrum 团队共同确定 Sprint 目标。开发人员结合能力，与产品负责人协商选择工作，并根据共同的完成定义（Definition of Done）规划交付方式。",
      "note": "Scrum 的 Sprint 长度不超过一个月。随着认识加深，可以澄清和重新协商范围，但不能危及 Sprint 目标。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nP->>D: 讨论优先级与迭代目标\nD-->>P: 预测本次可完成的工作\nD->>D: 规划任务与质量检查"
    },
    {
      "label": "3 持续开发与测试",
      "kicker": "步骤 3",
      "title": "持续开发与测试",
      "detail": "开发人员在迭代中协作完成设计、实现、评审、集成和测试，每天检查进展，并围绕 Sprint 目标调整工作计划。",
      "note": "敏捷仍然需要设计和文档。每日 Scrum 用于开发人员调整计划，并非向管理者汇报状态。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nD->>D: 设计、编码与评审\nD->>D: 持续集成与测试\nD->>D: 检查进展并调整计划"
    },
    {
      "label": "4 形成可用增量",
      "kicker": "步骤 4",
      "title": "形成可用增量",
      "detail": "开发人员确认增量满足完成定义。适合发布时，开发与运维团队协调发布准备和部署，让已完成的软件投入使用。",
      "note": "只有满足完成定义的工作才属于增量。Sprint 内也能发布，Sprint 评审不是发布审批关卡。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nD->>D: 检查是否满足完成定义\nopt 适合发布\nD->>O: 交付已完成增量与上线方案\nO-->>D: 反馈部署与服务状态\nend"
    },
    {
      "label": "5 共同检查产品结果",
      "kicker": "步骤 5",
      "title": "共同检查产品结果",
      "detail": "在 Sprint 评审中，Scrum 团队与业务方共同检查结果、讨论环境变化，并根据产品目标调整产品待办列表。",
      "note": "反馈可能改变优先级或原有假设；评审是共同讨论和调整工作的会议，不只是演示或签字验收。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nD->>S: 共同检查可用增量\nS->>P: 反馈与需求变化\nP->>D: 调整产品待办列表"
    },
    {
      "label": "6 改进协作并继续迭代",
      "kicker": "步骤 6",
      "title": "改进协作并继续迭代",
      "detail": "在 Sprint 回顾中，Scrum 团队检查协作方式，选出提高质量和工作成效的改进措施。下一次 Sprint 随即开始，并带入新的产品认识和改进措施。",
      "note": "敏捷也包含基于连续流动的方法。Sprint、产品负责人和这些事件属于 Scrum，并非所有敏捷方法的共同要求。",
      "diagram": "sequenceDiagram\nactor S as 业务方\nparticipant P as 产品负责人\nparticipant D as 开发人员\nparticipant O as 运维团队\nP->>D: 参与迭代回顾\nD->>D: 检查协作与质量问题\nD-->>P: 确定改进措施\nP->>D: 带入新优先级开始下一次迭代"
    }
  ]
};
