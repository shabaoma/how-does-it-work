module.exports = {
  steps: [
    {
      "label": "1 Enter email",
      "title": "Request a code",
      "detail": "The client submits an email address over HTTPS. The authentication service applies rate limits, generates a random code, and stores verification information and an expiry.",
      "note": "A uniform response can reduce disclosure of whether an account exists.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Authentication service\n participant R as Code store\n U->>B: Enter email\n B->>A: Submit email\n A->>R: Store verification data\n A-->>B: Return uniform message"
    },
    {
      "label": "2 Send email",
      "title": "Deliver the code",
      "detail": "The authentication service asks an email provider to send the message. The user reads the code from the mailbox.",
      "note": "Acceptance by the email provider does not guarantee delivery.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant A as Authentication service\n participant M as Email provider\n participant E as Mailbox\n actor U as User\n A->>M: Send code email\n M-->>A: Accept request\n M->>E: Deliver email\n U->>E: Read code"
    },
    {
      "label": "3 Verify code",
      "title": "Validate and consume the code",
      "detail": "The server checks the code, purpose, expiry and attempt limit. On success it atomically consumes the code, finds the account, and creates a session.",
      "note": "Whether an unknown email can register is a product policy.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Authentication service\n participant R as Code store\n participant S as Session store\n U->>B: Enter code\n B->>A: Submit email and code\n A->>R: Verify and consume code\n A->>S: Create session\n A-->>B: Set session cookie"
    },
    {
      "label": "4 Access service",
      "title": "Use the session",
      "detail": "Later requests use the session cookie. The service checks the session and permissions before returning data.",
      "note": "Signing out revokes the session and clears the cookie.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant B as Browser\n participant A as Business service\n participant S as Session store\n B->>A: Request with cookie\n A->>S: Look up session\n S-->>A: Session state\n A-->>B: Response"
    }
  ]
};
