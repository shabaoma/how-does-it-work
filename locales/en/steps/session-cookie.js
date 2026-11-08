module.exports = {
  steps: [
    {
      "label": "1 Sign in",
      "title": "Submit credentials",
      "detail": "The browser submits login credentials over HTTPS. The server verifies them before creating a session.",
      "note": "Failed verification must not create an authenticated session.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant B as Browser\n participant S as Server\n B->>S: Submit credentials\n S->>S: Verify credentials\n S-->>B: Authentication result"
    },
    {
      "label": "2 Create session",
      "title": "Store the login state",
      "detail": "The server creates a random session identifier, saves the associated login state, and returns the identifier in a Set-Cookie response.",
      "note": "Secure and HttpOnly protect cookie transport and script access; SameSite limits some cross-site requests.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant B as Browser\n participant S as Server\n participant D as Session store\n S->>D: Save session\n S-->>B: Set-Cookie with session ID"
    },
    {
      "label": "3 Access service",
      "title": "Look up the session",
      "detail": "On a matching request, the browser sends the cookie. The server looks up the identifier and checks the session before handling the request.",
      "note": "An absent, expired, or revoked session cannot establish login state.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant B as Browser\n participant S as Server\n participant D as Session store\n B->>S: Request with Cookie\n S->>D: Look up session ID\n D-->>S: Session state\n S-->>B: Response"
    },
    {
      "label": "4 Sign out",
      "title": "Revoke the session",
      "detail": "The server removes or invalidates the session and instructs the browser to clear the cookie.",
      "note": "Deleting the server-side session invalidates an old identifier even if a browser still sends it.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant B as Browser\n participant S as Server\n participant D as Session store\n B->>S: Sign out\n S->>D: Revoke session\n S-->>B: Clear cookie"
    }
  ]
};
