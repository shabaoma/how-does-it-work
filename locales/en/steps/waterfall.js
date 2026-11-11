module.exports = {
  "steps": [
    {
      "label": "1 Agree requirements",
      "kicker": "STEP 1",
      "title": "Agree requirements",
      "detail": "Stakeholders and the team define scope, constraints and measurable acceptance criteria. Reviewing this baseline gives later design and verification a shared reference.",
      "note": "A baseline controls changes; it does not guarantee that every requirement is correct or complete.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nS->>D: Propose needs and constraints\nD-->>S: Requirements and acceptance criteria\nS->>D: Approve requirements baseline"
    },
    {
      "label": "2 Review the design",
      "kicker": "STEP 2",
      "title": "Review the design",
      "detail": "The team turns the agreed requirements into architecture, interfaces, data models and a test strategy. A design review checks feasibility and traceability before implementation.",
      "note": "Review risky assumptions with prototypes where useful; do not defer all risk discovery until final testing.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nD->>D: Design architecture and interfaces\nD->>T: Review testability and verification plan\nT-->>D: Review findings\nD->>D: Record reviewed design"
    },
    {
      "label": "3 Implement and integrate",
      "kicker": "STEP 3",
      "title": "Implement and integrate",
      "detail": "Developers implement components against the design, review code and run unit tests. They integrate components into a versioned build for system verification.",
      "note": "Unit testing occurs during development; a later verification phase does not mean testing starts only after coding.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nD->>D: Implement, review and unit test\nD->>D: Integrate components\nD->>T: Deliver versioned build"
    },
    {
      "label": "4 Verify against requirements",
      "kicker": "STEP 4",
      "title": "Verify against requirements",
      "detail": "Testers check the integrated build against requirements and quality criteria. Defects return to developers for correction and regression testing; requirement or design problems require corresponding reviews.",
      "note": "Passing tests is evidence against defined criteria, not proof that all defects are absent.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nT->>T: Run integration and system tests\nopt Defects found\nT->>D: Report defects\nD-->>T: Corrected build\nT->>T: Retest and regression test\nend\nT-->>S: Verification results"
    },
    {
      "label": "5 Accept and release",
      "kicker": "STEP 5",
      "title": "Accept and release",
      "detail": "Stakeholders evaluate acceptance evidence. Once acceptance and release conditions are met, operations deploys the approved build using a rollout and recovery plan.",
      "note": "Acceptance and production deployment are separate decisions; an unsuccessful review returns work for correction.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nS->>T: Evaluate acceptance criteria\nT-->>S: Acceptance evidence\nS->>O: Authorize accepted release\nD->>O: Build and deployment instructions\nO->>O: Deploy and verify service"
    },
    {
      "label": "6 Maintain and assess changes",
      "kicker": "STEP 6",
      "title": "Maintain and assess changes",
      "detail": "Operations reports incidents and new needs. The team evaluates the impact on requirements, cost, schedule, design and tests before an approved change re-enters the affected phases.",
      "note": "Changes are possible, but late changes may require extensive rework and renewed approvals.",
      "diagram": "sequenceDiagram\nactor S as Stakeholders\nparticipant D as Development team\nparticipant T as Test team\nparticipant O as Operations\nO->>D: Incidents and change requests\nD-->>S: Impact assessment\nS->>D: Approve or defer change\nopt Change approved\nD->>D: Revisit affected phases\nend"
    }
  ]
};
