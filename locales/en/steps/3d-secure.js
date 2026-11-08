module.exports = {
  steps: [
    {
      "label": "1 Start payment",
      "title": "Submit transaction information",
      "detail": "The cardholder starts a payment. The merchant or its provider sends transaction and device information in a 3DS authentication request.",
      "note": "The data and integration depend on the payment provider and network rules.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as Cardholder\n participant M as Merchant\n participant D as Directory server\n U->>M: Submit payment\n M->>D: Send authentication request"
    },
    {
      "label": "2 Assess risk",
      "title": "Route the authentication request",
      "detail": "The directory server routes the request to the issuing bank authentication system, which evaluates the available information.",
      "note": "A frictionless result does not mean that the issuer skipped risk assessment.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant M as Merchant\n participant D as Directory server\n participant A as Issuer authentication system\n M->>D: Authentication request\n D->>A: Route request\n A->>A: Assess transaction risk\n A-->>D: Authentication status"
    },
    {
      "label": "3 Challenge if needed",
      "title": "Complete any required verification",
      "detail": "If the issuer requires a challenge, the cardholder completes the bank’s verification flow. The issuer returns the authentication status.",
      "note": "A challenge can fail, be cancelled, or be unavailable.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nactor U as Cardholder\n participant A as Issuer authentication system\n participant D as Directory server\n A->>U: Request verification\n U->>A: Complete verification\n A-->>D: Authentication result"
    },
    {
      "label": "4 Authorize payment",
      "title": "Request payment authorization",
      "detail": "The merchant receives the authentication result and sends the relevant data with the subsequent authorization request, according to provider and network requirements.",
      "note": "Successful authentication does not guarantee authorization; the issuer makes a separate decision.",
      "kicker": "STEP",
      "diagram": "sequenceDiagram\nparticipant M as Merchant\n participant P as Payment network\n participant I as Issuer\n M->>P: Authorization request and authentication data\n P->>I: Forward authorization\n I-->>P: Authorization decision\n P-->>M: Payment result"
    }
  ]
};
