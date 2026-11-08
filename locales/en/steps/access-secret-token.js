module.exports = {
  steps: [
    {
      "label": "1 Sign in",
      "title": "Obtain tokens",
      "detail": "The client submits credentials to the authentication server. After successful authentication, the server may issue access and refresh tokens.",
      "note": "A refresh token must be kept secret and sent only to the authentication server.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Client\n participant A as Authentication server\n C->>A: Submit credentials\n A->>A: Verify identity\n A-->>C: Access and refresh tokens"
    },
    {
      "label": "2 Call an API",
      "title": "Use the access token",
      "detail": "The client sends the access token to the business server, which checks it and its permissions before handling the request.",
      "note": "A valid token does not necessarily grant permission for every operation.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Client\n participant B as Business server\n C->>B: Request with access token\n B->>B: Validate token and permissions\n B-->>C: Response"
    },
    {
      "label": "3 Refresh",
      "title": "Request a new access token",
      "detail": "When an access token expires, the client can present a valid refresh token to the authentication server to obtain another.",
      "note": "The server may rotate the refresh token or refuse an expired or revoked token.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Client\n participant A as Authentication server\n C->>A: Submit refresh token\n A->>A: Check token\n A-->>C: New access token"
    },
    {
      "label": "4 Sign out",
      "title": "End the refresh session",
      "detail": "The authentication server can revoke the refresh token so it cannot be used to obtain further access tokens.",
      "note": "An already issued access token may remain usable until expiry unless the system also checks revocation.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant C as Client\n participant A as Authentication server\n C->>A: Sign out or revoke token\n A->>A: Revoke refresh token\n A-->>C: Confirmation"
    }
  ]
};
