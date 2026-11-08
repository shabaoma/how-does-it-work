const step = (label, title, detail, note, diagram) => ({ label, title, detail, note, kicker: 'STEP', diagram: `sequenceDiagram\n${diagram}` });
module.exports = [
  {
    url: 'session-cookie.html', label: 'Session Cookie', category: 'Identity and login', title: 'Session cookie login',
    description: 'How a browser stores a session identifier and a server restores login state.',
    lead: 'The server stores login state and sends an opaque session identifier in Set-Cookie. The browser sends the cookie on matching requests, allowing the server to find the session.',
    overview: 'flowchart LR\n B[Browser] -->|Credentials| S[Server]\n S -->|Save session| D[(Session store)]\n S -->|Set-Cookie| B\n B -->|Later request with cookie| S\n S -->|Look up session| D\n S -->|Response| B',
    overviewNote: 'The cookie carries an identifier; the server checks the session store for login state.',
    steps: [
      step('1 Sign in','Submit credentials','The browser submits login credentials over HTTPS. The server verifies them before creating a session.','Failed verification must not create an authenticated session.','participant B as Browser\n participant S as Server\n B->>S: Submit credentials\n S->>S: Verify credentials\n S-->>B: Authentication result'),
      step('2 Create session','Store the login state','The server creates a random session identifier, saves the associated login state, and returns the identifier in a Set-Cookie response.','Secure and HttpOnly protect cookie transport and script access; SameSite limits some cross-site requests.','participant B as Browser\n participant S as Server\n participant D as Session store\n S->>D: Save session\n S-->>B: Set-Cookie with session ID'),
      step('3 Access service','Look up the session','On a matching request, the browser sends the cookie. The server looks up the identifier and checks the session before handling the request.','An absent, expired, or revoked session cannot establish login state.','participant B as Browser\n participant S as Server\n participant D as Session store\n B->>S: Request with Cookie\n S->>D: Look up session ID\n D-->>S: Session state\n S-->>B: Response'),
      step('4 Sign out','Revoke the session','The server removes or invalidates the session and instructs the browser to clear the cookie.','Deleting the server-side session invalidates an old identifier even if a browser still sends it.','participant B as Browser\n participant S as Server\n participant D as Session store\n B->>S: Sign out\n S->>D: Revoke session\n S-->>B: Clear cookie')
    ],
    extra: 'The session store holds login state; the cookie carries its identifier. HttpOnly prevents page scripts from reading the cookie, Secure limits transmission to HTTPS, and SameSite mitigates some cross-site request forgery scenarios.',
    footer: 'This illustrates a common browser session cookie flow; behavior depends on the application.'
  },
  {
    url: 'access-secret-token.html', label: 'Access / Secret', category: 'Identity and login', title: 'Access tokens and secret tokens',
    description: 'How access and refresh tokens support authentication and where each must be protected.',
    lead: 'After authentication, a client may receive an access token for API calls and a longer-lived secret token for obtaining a new access token. In OAuth, the latter is usually called a refresh token.',
    overview: 'flowchart LR\n C[Client] -->|Login credentials| A[Authentication server]\n A -->|Access and refresh tokens| C\n C -->|Access token| B[Business server]\n B -->|Response| C\n C -.->|Refresh token when needed| A',
    overviewNote: 'The secret token in this example is a refresh token. Issuance and rotation depend on the system design.',
    steps: [
      step('1 Sign in','Obtain tokens','The client submits credentials to the authentication server. After successful authentication, the server may issue access and refresh tokens.','A refresh token must be kept secret and sent only to the authentication server.','participant C as Client\n participant A as Authentication server\n C->>A: Submit credentials\n A->>A: Verify identity\n A-->>C: Access and refresh tokens'),
      step('2 Call an API','Use the access token','The client sends the access token to the business server, which checks it and its permissions before handling the request.','A valid token does not necessarily grant permission for every operation.','participant C as Client\n participant B as Business server\n C->>B: Request with access token\n B->>B: Validate token and permissions\n B-->>C: Response'),
      step('3 Refresh','Request a new access token','When an access token expires, the client can present a valid refresh token to the authentication server to obtain another.','The server may rotate the refresh token or refuse an expired or revoked token.','participant C as Client\n participant A as Authentication server\n C->>A: Submit refresh token\n A->>A: Check token\n A-->>C: New access token'),
      step('4 Sign out','End the refresh session','The authentication server can revoke the refresh token so it cannot be used to obtain further access tokens.','An already issued access token may remain usable until expiry unless the system also checks revocation.','participant C as Client\n participant A as Authentication server\n C->>A: Sign out or revoke token\n A->>A: Revoke refresh token\n A-->>C: Confirmation')
    ],
    extra: 'An access token is sent to the resource server, often in Authorization: Bearer. A refresh token is sent to the authentication server. A client secret identifies a confidential application and is a different credential.',
    footer: 'This is a general token login flow. Actual issuance, validation, and revocation depend on the system.'
  },
  {
    url: 'email-code.html', label: 'Email code', category: 'Identity and login', title: 'Email verification code login',
    description: 'Follow a one-time email code from delivery to a signed-in session.',
    lead: 'A user submits an email address and receives a one-time code. The server verifies the code and establishes a login session; possession of the code demonstrates current access to the mailbox.',
    overview: 'flowchart LR\n U[User] -->|Email and code| B[Browser or app]\n B -->|HTTPS requests| A[Authentication service]\n A -->|Store and verify code| R[(Code store)]\n A -->|Send email| M[Email provider]\n M -->|Deliver code| E[Mailbox]\n E -->|User reads code| U\n A -->|Create session| S[(Session store)]\n A -->|Session cookie| B',
    overviewNote: 'The code is used for this authentication attempt; a new session maintains subsequent login state.',
    steps: [
      step('1 Enter email','Request a code','The client submits an email address over HTTPS. The authentication service applies rate limits, generates a random code, and stores verification information and an expiry.','A uniform response can reduce disclosure of whether an account exists.','actor U as User\n participant B as Browser\n participant A as Authentication service\n participant R as Code store\n U->>B: Enter email\n B->>A: Submit email\n A->>R: Store verification data\n A-->>B: Return uniform message'),
      step('2 Send email','Deliver the code','The authentication service asks an email provider to send the message. The user reads the code from the mailbox.','Acceptance by the email provider does not guarantee delivery.','participant A as Authentication service\n participant M as Email provider\n participant E as Mailbox\n actor U as User\n A->>M: Send code email\n M-->>A: Accept request\n M->>E: Deliver email\n U->>E: Read code'),
      step('3 Verify code','Validate and consume the code','The server checks the code, purpose, expiry and attempt limit. On success it atomically consumes the code, finds the account, and creates a session.','Whether an unknown email can register is a product policy.','actor U as User\n participant B as Browser\n participant A as Authentication service\n participant R as Code store\n participant S as Session store\n U->>B: Enter code\n B->>A: Submit email and code\n A->>R: Verify and consume code\n A->>S: Create session\n A-->>B: Set session cookie'),
      step('4 Access service','Use the session','Later requests use the session cookie. The service checks the session and permissions before returning data.','Signing out revokes the session and clears the cookie.','participant B as Browser\n participant A as Business service\n participant S as Session store\n B->>A: Request with cookie\n A->>S: Look up session\n S-->>A: Session state\n A-->>B: Response')
    ],
    extra: 'Use cryptographically secure random codes, short expirations, one-time consumption, and rate limits. Protect stored verification values, avoid account enumeration, and use HTTPS. Email codes depend on mailbox security and are not phishing-resistant multifactor authentication.',
    footer: 'This example uses a session cookie; other systems may issue tokens.'
  },
  {
    url: '3d-secure.html', label: '3D Secure', category: 'Payments', title: '3D Secure payment authentication',
    description: 'The participants and flow of cardholder authentication for online payments.',
    lead: '3D Secure (3DS) lets a merchant request cardholder authentication through the card network and issuing bank. The issuer assesses risk and may require a challenge. Payment authorization is a separate step.',
    overview: 'flowchart LR\n U[Cardholder] -->|Submit payment| M[Merchant or payment provider]\n M -->|3DS request| D[Directory server]\n D -->|Authentication request| A[Issuer authentication system]\n A -.->|Challenge when needed| U\n A -->|Authentication result| D\n D -->|Authentication result| M\n M -->|Payment authorization| P[Payment network]\n P -->|Authorization request| I[Issuer]',
    overviewNote: 'The three domains are the acquirer, interoperability, and issuer domains. Deployments and roles vary.',
    steps: [
      step('1 Start payment','Submit transaction information','The cardholder starts a payment. The merchant or its provider sends transaction and device information in a 3DS authentication request.','The data and integration depend on the payment provider and network rules.','actor U as Cardholder\n participant M as Merchant\n participant D as Directory server\n U->>M: Submit payment\n M->>D: Send authentication request'),
      step('2 Assess risk','Route the authentication request','The directory server routes the request to the issuing bank authentication system, which evaluates the available information.','A frictionless result does not mean that the issuer skipped risk assessment.','participant M as Merchant\n participant D as Directory server\n participant A as Issuer authentication system\n M->>D: Authentication request\n D->>A: Route request\n A->>A: Assess transaction risk\n A-->>D: Authentication status'),
      step('3 Challenge if needed','Complete any required verification','If the issuer requires a challenge, the cardholder completes the bank’s verification flow. The issuer returns the authentication status.','A challenge can fail, be cancelled, or be unavailable.','actor U as Cardholder\n participant A as Issuer authentication system\n participant D as Directory server\n A->>U: Request verification\n U->>A: Complete verification\n A-->>D: Authentication result'),
      step('4 Authorize payment','Request payment authorization','The merchant receives the authentication result and sends the relevant data with the subsequent authorization request, according to provider and network requirements.','Successful authentication does not guarantee authorization; the issuer makes a separate decision.','participant M as Merchant\n participant P as Payment network\n participant I as Issuer\n M->>P: Authorization request and authentication data\n P->>I: Forward authorization\n I-->>P: Authorization decision\n P-->>M: Payment result')
    ],
    extra: 'Frictionless and challenge are possible authentication paths, not guarantees of success. Liability shift depends on network rules and transaction outcomes. 3DS does not prevent a user from being tricked into approving a fraudulent transaction.',
    footer: 'This is a common 3DS flow; follow the applicable payment provider and card network requirements.'
  },
  {
    url: 'aws-sts.html', label: 'AWS STS', category: 'Cloud services', title: 'How AWS STS works',
    description: 'Learn about temporary credentials and permissions using cross-account AssumeRole.',
    lead: 'AWS Security Token Service (STS) issues temporary credentials for an IAM role. This example uses cross-account AssumeRole: permission to assume a role and permission to access a resource are separate checks.',
    overview: 'flowchart LR\n C[Caller] -->|AssumeRole| S[STS]\n S -->|Check trust and permissions| I[IAM policies]\n S -->|Temporary credentials| C\n C -->|Signed request and session token| R[AWS resource service]\n R -->|Authorized response| C',
    overviewNote: 'This example uses a cross-account role; federation and AWS service credential paths differ.',
    steps: [
      step('1 Request role','Call AssumeRole','The caller signs an AssumeRole request for the target role. STS evaluates the role trust policy and the caller’s permission to assume it.','For cross-account access, the caller’s permission and the target role’s trust both matter.','participant C as Caller\n participant S as STS\n participant I as IAM policies\n C->>S: AssumeRole request\n S->>I: Check trust and permissions\n I-->>S: Evaluation result'),
      step('2 Receive credentials','Obtain temporary credentials','If the request is allowed, STS returns an access key ID, secret access key, session token and expiration.','The secret access key must be protected; the session token is not a refresh token.','participant C as Caller\n participant S as STS\n S->>S: Create role session\n S-->>C: Temporary credentials and expiration'),
      step('3 Access resources','Sign a resource request','The caller signs a request with the temporary credentials and includes the session token. The resource service evaluates the effective permissions.','Role, session, resource, organization and other applicable policies can affect authorization.','participant C as Caller\n participant R as AWS resource service\n C->>R: Signed request and session token\n R->>R: Evaluate permissions\n R-->>C: Result or denial'),
      step('4 Renew credentials','Obtain new credentials before expiry','Once credentials expire, they cannot be used for new requests. A caller must obtain a new set; some SDK providers do this automatically.','AssumeRole defaults to one hour; role chaining is limited to one hour.','participant C as Caller\n participant S as STS\n C->>S: New AssumeRole request\n S-->>C: New temporary credentials')
    ],
    extra: 'Session policies can restrict role permissions but do not expand the role’s identity-based permissions. AssumeRoleWithWebIdentity and AssumeRoleWithSAML use different federation inputs. Explicit denies and other applicable policy limits still apply.',
    footer: 'This example covers programmatic cross-account AssumeRole; other STS operations have different requirements.'
  }
];
