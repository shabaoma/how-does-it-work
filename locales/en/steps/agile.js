module.exports = {
  "steps": [
    {
      "label": "1 Clarify the product goal",
      "kicker": "STEP 1",
      "title": "Clarify the product goal",
      "detail": "Stakeholders and the Product Owner clarify the problem and desired outcome. The Product Owner orders the Product Backlog so the team can focus on valuable work and known risks.",
      "note": "A backlog is an evolving plan, not a promise that every item will be delivered.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nS->>P: Needs and feedback\nP->>D: Product Goal and ordered backlog\nD-->>P: Feasibility and risk feedback"
    },
    {
      "label": "2 Plan a small increment",
      "kicker": "STEP 2",
      "title": "Plan a small increment",
      "detail": "The Scrum Team agrees a Sprint Goal. Developers select work with the Product Owner and plan how to deliver it within the Sprint, using capacity and a shared Definition of Done.",
      "note": "A Scrum Sprint lasts one month or less. Scope can be clarified and renegotiated as learning occurs without endangering the Sprint Goal.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nP->>D: Discuss priorities and Sprint Goal\nD-->>P: Forecast selected work\nD->>D: Plan tasks and quality checks"
    },
    {
      "label": "3 Build and test continuously",
      "kicker": "STEP 3",
      "title": "Build and test continuously",
      "detail": "Developers collaborate on design, implementation, review, integration and testing throughout the Sprint. They inspect progress daily and adapt their plan toward the Sprint Goal.",
      "note": "Design and documentation still matter. The Daily Scrum adapts the developers’ plan rather than serving as a manager status report.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nD->>D: Design, implement and review\nD->>D: Integrate and test continuously\nD->>D: Inspect progress and adapt plan"
    },
    {
      "label": "4 Produce a usable increment",
      "kicker": "STEP 4",
      "title": "Produce a usable increment",
      "detail": "Developers verify that the increment meets the Definition of Done. Operations and developers coordinate release readiness and deployment when appropriate.",
      "note": "Only work meeting the Definition of Done belongs in the increment. A release can occur during a Sprint; the Sprint Review is not a release gate.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nD->>D: Check Definition of Done\nopt Release appropriate\nD->>O: Done increment and rollout plan\nO-->>D: Deployment and health feedback\nend"
    },
    {
      "label": "5 Inspect results with stakeholders",
      "kicker": "STEP 5",
      "title": "Inspect results with stakeholders",
      "detail": "At the Sprint Review, the Scrum Team and stakeholders inspect the outcome, discuss changes in context and adapt the Product Backlog toward the Product Goal.",
      "note": "Feedback can change priorities or assumptions; the review is a working discussion, not merely a demonstration or sign-off.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nD->>S: Inspect working increment together\nS->>P: Feedback and changed needs\nP->>D: Adapted Product Backlog"
    },
    {
      "label": "6 Improve and repeat",
      "kicker": "STEP 6",
      "title": "Improve and repeat",
      "detail": "At the Sprint Retrospective, the Scrum Team inspects how it worked and chooses improvements to quality and effectiveness. The next Sprint starts immediately with updated product knowledge and improvements.",
      "note": "Agile also includes flow-based approaches. Sprints, Product Owner and these events belong to Scrum, not every Agile approach.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant P as Product Owner\nparticipant D as Developers\nparticipant O as Operations\nP->>D: Participate in retrospective\nD->>D: Inspect collaboration and quality\nD-->>P: Agreed improvements\nP->>D: Begin next Sprint with updated priorities"
    }
  ]
};
