module.exports = {
  steps: [
    {
      "label": "1 Send request",
      "title": "Sign an object request",
      "detail": "The caller signs an S3 GetObject request with temporary role credentials and supplies the access key ID and session token.",
      "note": "The secret access key is used to calculate the signature and is not sent as a request parameter.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as S3 service\n participant P as IAM authorization\n participant R as S3 object\n C->>S: Signed GetObject request and session token"
    },
    {
      "label": "2 Authenticate",
      "title": "Validate the credentials",
      "detail": "AWS validates the signature and temporary credentials and identifies the role session.",
      "note": "Invalid or expired credentials cause the request to fail. Some services also support anonymous requests.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as S3 service\n participant P as IAM authorization\n participant R as S3 object\n S->>S: Validate signature and credentials\n alt Invalid credentials\n S-->>C: Error\n end"
    },
    {
      "label": "3 Evaluate",
      "title": "Evaluate applicable policies",
      "detail": "AWS evaluates applicable policies against the principal, action, resource and request context. An applicable explicit deny overrides allows; absent a sufficient allow, the request is implicitly denied.",
      "note": "Policy types and the principal named in a resource policy affect evaluation.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as S3 service\n participant P as IAM authorization\n participant R as S3 object\n S->>P: Evaluate request context\n P-->>S: Allow or deny"
    },
    {
      "label": "4 Return result",
      "title": "Execute or reject the request",
      "detail": "If authorization and other service checks succeed, S3 reads and returns the object. A denied request returns an access error.",
      "note": "An allowed request may still fail, for example if the object is missing or a required encryption key permission is absent.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Caller\n participant S as S3 service\n participant P as IAM authorization\n participant R as S3 object\n alt Allowed and other checks pass\n S->>R: Read object\n R-->>S: Object data\n S-->>C: Return object\n else Denied or other error\n S-->>C: Return error\n end"
    }
  ]
};
