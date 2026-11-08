const steps = [
  { label: '1 准备输入', kicker: 'DATA', title: '准备任务输入和评估集', detail: '先明确学生需要完成的任务，收集或编写有代表性的输入，例如用户问题。另留一组独立评估数据，用于之后检查模型在未见过的问题上的表现。', note: '训练集与评估集需要避免重复或信息泄漏，否则评估结果可能过于乐观。', diagram: `sequenceDiagram
    participant D as 数据集
    participant P as 准备流程
    participant T as 训练集
    participant E as 评估集
    D->>P: 提供任务输入
    P->>T: 整理训练输入
    P->>E: 留出独立评估数据` },
  { label: '2 教师生成', kicker: 'TEACHER', title: '让教师为训练输入提供指导', detail: '把训练输入交给教师模型，保存输入及其答案。根据任务筛选、去重并检查答案；如果能访问教师的预测概率，也可以保存概率供后续训练。', note: '教师输出并非标准答案：它可能出错。是否能取得概率取决于模型接口。', diagram: `sequenceDiagram
    participant T as 训练集
    participant M as 教师模型
    participant P as 准备流程
    participant C as 蒸馏数据
    T->>M: 提供训练输入
    M-->>P: 返回答案或概率
    P->>P: 筛选并检查结果
    P->>C: 保存输入和指导信号` },
  { label: '3 训练学生', kicker: 'TRAINING', title: '用指导信号更新学生模型', detail: '训练程序把输入送入学生模型，将学生预测与教师答案或概率比较，计算损失，再通过反向传播更新学生参数。这个过程会对许多样本重复。', note: '文本答案可以作为监督微调目标；概率蒸馏则比较分布，两者使用的损失不完全相同。', diagram: `sequenceDiagram
    participant C as 蒸馏数据
    participant P as 训练程序
    participant S as 学生模型
    C->>P: 输入与教师指导
    P->>S: 输入问题
    S-->>P: 学生预测
    P->>P: 计算损失与梯度
    P->>S: 更新学生参数` },
  { label: '4 评估部署', kicker: 'EVALUATION', title: '评估学生并决定是否部署', detail: '用未参与训练的样本测试学生，检查任务质量、安全性和常见失败情况，并在目标硬件上测量延迟与资源消耗。达到应用要求后，才将学生部署给用户。', note: '如果效果不达标，可以改进数据或训练方法再评估；蒸馏不保证保留教师的全部能力。', diagram: `sequenceDiagram
    participant E as 评估集
    participant S as 学生模型
    participant P as 评估流程
    participant A as 应用
    E->>S: 提供未见过的输入
    S-->>P: 返回预测
    P->>P: 检查质量和运行成本
    P->>A: 达标后部署学生模型` }
];
module.exports = { steps };
