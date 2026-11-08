const steps = [
  {
    "label": "1 Human prepares",
    "kicker": "PREPARATION",
    "title": "Design the framework before the event",
    "detail": "The competitor prepared goals, tools, constraints and decision rules, then refined the workflow through practice. The retrospective describes about three months of preparation; after starting the agent on competition day, he gave no further instructions.",
    "note": "Autonomy depends on prior human design and tools supplied by the competition environment.",
    "diagram": "sequenceDiagram\n    participant P0 as Human\n    participant P1 as Framework\n    participant P2 as Main agent\n    P0->>P1: Set goals constraints and tools\n    P0->>P2: Start competition task\n    P1->>P2: Provide execution rules"
  },
  {
    "label": "2 Main agent investigates",
    "kicker": "INVESTIGATION",
    "title": "Inspect the system and identify bottlenecks",
    "detail": "The main agent examines the service, metrics and benchmark results. It identifies potential constraints such as cross-region database access and proposes changes.",
    "note": "Analysis produces hypotheses that need testing; one measurement does not establish a cause.",
    "diagram": "sequenceDiagram\n    participant P0 as Main agent\n    participant P1 as Service\n    participant P2 as Benchmark\n    P0->>P1: Inspect code and architecture\n    P0->>P2: Run benchmark\n    P2->>P0: Return metrics and logs"
  },
  {
    "label": "3 Experiment and feedback",
    "kicker": "EXPERIMENT",
    "title": "Change, deploy and compare",
    "detail": "The main agent changes the implementation, deploys it and runs tests again, deciding whether to keep or revert based on correctness and score. The retrospective reports 86 benchmark runs and 19 commits; score changes cannot all be attributed to individual changes.",
    "note": "Local reads and centralized writes were one architecture experiment; test variance and correctness matter too.",
    "diagram": "sequenceDiagram\n    participant P0 as Main agent\n    participant P1 as Service\n    participant P2 as Benchmark\n    P0->>P1: Change and deploy candidate\n    P0->>P2: Run tests\n    P2->>P0: Return correctness and score\n    P0->>P1: Keep or revert candidate"
  },
  {
    "label": "4 Subagent audits",
    "kicker": "AUDIT",
    "title": "Start a separate review when progress stalls",
    "detail": "When scores stopped improving for a long time, a configured hook prompted an audit subagent. It revisited earlier decisions against a checklist, looked for omissions and returned findings to the main agent for judgment.",
    "note": "An audit provides another perspective; suggestions still need validation, and the account does not imply independent concurrent deployments.",
    "diagram": "sequenceDiagram\n    participant P0 as Framework\n    participant P1 as Main agent\n    participant P2 as Audit agent\n    participant P3 as Service\n    P0->>P1: Prompt audit when stalled\n    P1->>P2: Delegate review\n    P2->>P3: Review earlier decisions\n    P2->>P1: Return findings and suggestions"
  },
  {
    "label": "5 Decide when to stop",
    "kicker": "DECISION",
    "title": "Use remaining budget and test variance",
    "detail": "Near the end, the main agent used a prepared statistical decision tool, considering score variance, thresholds and remaining test opportunities. The retrospective reports it stopped at 625,857 points and won.",
    "note": "The same configuration can yield different scores. A stopping rule is a competition strategy, not a guarantee of improvement.",
    "diagram": "sequenceDiagram\n    participant P0 as Main agent\n    participant P1 as Decision tool\n    participant P2 as Service\n    P0->>P1: Provide results and remaining runs\n    P1->>P0: Return statistical guidance\n    P0->>P2: Stop and retain candidate"
  }
];
module.exports = { steps };
