module.exports = {
  steps: [
    {
      "label": "1 Request role",
      "title": "Call AssumeRole",
      "detail": "The caller signs an AssumeRole request for the target role. STS evaluates the role trust policy and the caller’s permission to assume it.",
      "note": "For cross-account access, the caller’s permission and the target role’s trust both matter.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as STS\n participant I as IAM policies\n C->>S: AssumeRole request\n S->>I: Check trust and permissions\n I-->>S: Evaluation result"
    },
    {
      "label": "2 Receive credentials",
      "title": "Obtain temporary credentials",
      "detail": "If the request is allowed, STS returns an access key ID, secret access key, session token and expiration.",
      "note": "The secret access key must be protected; the session token is not a refresh token.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as STS\n S->>S: Create role session\n S-->>C: Temporary credentials and expiration"
    },
    {
      "label": "3 Access resources",
      "title": "Sign a resource request",
      "detail": "The caller signs a request with the temporary credentials and includes the session token. The resource service evaluates the effective permissions.",
      "note": "Role, session, resource, organization and other applicable policies can affect authorization.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant R as AWS resource service\n C->>R: Signed request and session token\n R->>R: Evaluate permissions\n R-->>C: Result or denial"
    },
    {
      "label": "4 Renew credentials",
      "title": "Obtain new credentials before expiry",
      "detail": "Once credentials expire, they cannot be used for new requests. A caller must obtain a new set; some SDK providers do this automatically.",
      "note": "AssumeRole defaults to one hour; role chaining is limited to one hour.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as STS\n C->>S: New AssumeRole request\n S-->>C: New temporary credentials"
    }
  ]
};
