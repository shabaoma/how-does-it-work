module.exports = {
  steps: [
    {
      "label": "1 Start login",
      "title": "Redirect to the identity provider",
      "detail": "The user selects single sign-on. The application stores state and PKCE verification information, then redirects the browser to the provider authorization endpoint.",
      "note": "The application must register its client and callback address in advance. The request includes client_id, redirect_uri, the openid scope, and authorization code flow parameters.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n U->>B: Select single sign-on\n B->>A: Start login\n A-->>B: Redirect to authorization endpoint\n B->>I: Authorization request"
    },
    {
      "label": "2 Authenticate",
      "title": "The identity provider verifies the user",
      "detail": "The identity provider checks its own session. If no usable session exists, it asks the user to authenticate according to its policy and can establish a provider session after success.",
      "note": "An existing provider session may allow the flow to continue without credentials. Reauthentication and consent depend on the request and provider policy.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n I-->>B: Show login page if needed\n U->>B: Provide credentials if needed\n B->>I: Submit authentication\n I-->>B: Authentication complete"
    },
    {
      "label": "3 Return code",
      "title": "The browser returns the authorization code",
      "detail": "The identity provider redirects the browser to the registered callback address with a one-time authorization code and the request state. The application checks state before processing the code.",
      "note": "The authorization code is not an application session. The application stops login if authentication is denied or state does not match.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n I-->>B: Redirect with code and state\n B->>A: Request callback"
    },
    {
      "label": "4 Exchange code",
      "title": "Exchange the code and validate identity",
      "detail": "The application server sends the authorization code and PKCE verifier to the token endpoint and authenticates as required for its client type. The provider validates the request and returns tokens; the application validates the ID token and identifies the user.",
      "note": "The ID token conveys the authentication result to the application; an access token is used to access protected resources.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n A->>I: Code and PKCE verifier\n I-->>A: ID token and access token"
    },
    {
      "label": "5 Create session",
      "title": "The application creates its own session",
      "detail": "The application finds or creates a local account for the verified external identity, creates a local session, and sets a session cookie in the browser. The browser sends that cookie on subsequent requests.",
      "note": "Account creation and linking follow application policy. Set Secure, HttpOnly, and an appropriate SameSite attribute on the cookie.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n A-->>B: Set session cookie\n B->>A: Subsequent request with cookie\n A-->>B: Signed-in page"
    },
    {
      "label": "6 Sign out locally",
      "title": "The application ends its local session",
      "detail": "When the user signs out, the application invalidates the local session and clears the session cookie. Later requests cannot use that session to access the application.",
      "note": "This alone does not end the identity provider session or other applications’ sessions.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n U->>B: Select sign out\n B->>A: Submit logout request\n A-->>B: Clear cookie and return result"
    },
    {
      "label": "7 Optional SSO logout",
      "title": "Request identity provider logout",
      "detail": "If provider logout is configured, the application can redirect the browser to the provider logout endpoint after local logout. The provider ends its own session and may notify other applications to end corresponding sessions.",
      "note": "The endpoint, user confirmation, return address, and logout notifications depend on provider capabilities and configuration. Notifications may fail.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as User\n participant B as Browser\n participant A as Application\n participant I as Identity provider\n A-->>B: Optional redirect to logout endpoint\n B->>I: Request logout\n I-->>B: Optional redirect to application\n B->>A: Optional post-logout request"
    }
  ]
};
