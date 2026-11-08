const steps = [
  { label: '1 Prepare inputs', kicker: 'DATA', title: 'Prepare task inputs and an evaluation set', detail: 'Define the task the student should perform and collect or write representative inputs, such as user questions. Keep a separate evaluation set to check performance on examples the model has not seen.', note: 'Avoid overlap and information leakage between training and evaluation data, which can make results look too optimistic.', diagram: `sequenceDiagram
    participant D as Dataset
    participant P as Preparation
    participant T as Training set
    participant E as Evaluation set
    D->>P: Provide task inputs
    P->>T: Prepare training inputs
    P->>E: Hold out evaluation data` },
  { label: '2 Teacher generates', kicker: 'TEACHER', title: 'Ask the teacher to guide training', detail: 'Send training inputs to the teacher and save each input with its answer. Filter, deduplicate, and check the answers for the task. If teacher probabilities are available, they can also be saved for training.', note: 'Teacher output is not automatically correct. Whether probabilities are available depends on the model interface.', diagram: `sequenceDiagram
    participant T as Training set
    participant M as Teacher model
    participant P as Preparation
    participant C as Distillation data
    T->>M: Provide training inputs
    M-->>P: Return answers or probabilities
    P->>P: Filter and check results
    P->>C: Save inputs and guidance` },
  { label: '3 Train student', kicker: 'TRAINING', title: 'Update the student using the guidance', detail: 'The training process feeds inputs to the student, compares its predictions with teacher answers or probabilities, and calculates a loss. Backpropagation then updates student parameters. This repeats across many examples.', note: 'Teacher text can be used as a supervised fine-tuning target; probability distillation compares distributions and uses a different loss.', diagram: `sequenceDiagram
    participant C as Distillation data
    participant P as Training process
    participant S as Student model
    C->>P: Inputs and teacher guidance
    P->>S: Input question
    S-->>P: Student prediction
    P->>P: Calculate loss and gradients
    P->>S: Update student parameters` },
  { label: '4 Evaluate and deploy', kicker: 'EVALUATION', title: 'Evaluate the student before deployment', detail: 'Test the student on held-out examples, check task quality, safety, and common failures, and measure latency and resource use on target hardware. Deploy the student only if it meets the application’s requirements.', note: 'If it falls short, improve data or training and evaluate again. Distillation does not guarantee that every teacher capability survives.', diagram: `sequenceDiagram
    participant E as Evaluation set
    participant S as Student model
    participant P as Evaluation process
    participant A as Application
    E->>S: Provide unseen inputs
    S-->>P: Return predictions
    P->>P: Check quality and running cost
    P->>A: Deploy student if it meets requirements` }
];
module.exports = { steps };
