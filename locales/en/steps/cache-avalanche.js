module.exports = {
  "steps": [
    {
      "label": "1 Cache capacity changes",
      "kicker": "STEP 1",
      "title": "Cache capacity changes",
      "detail": "The application normally serves reads from cache. A shared outage or restart can make many entries unavailable at once; similar TTLs can also expire many keys together.",
      "note": "Diagnose cache outages and synchronized expiry as separate triggers.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant G as Protection\nparticipant O as Operations\n    U->>A: Read request\nA->>C: Get key\nC-->>A: Cached value when healthy\nNote over C: Expiry burst or cache unavailable"
    },
    {
      "label": "2 Misses shift to the source",
      "kicker": "STEP 2",
      "title": "Misses shift to the source",
      "detail": "Requests fall through to the database or another backing service. A concurrent wave can exhaust connections, CPU or request capacity.",
      "note": "Fail-open and fail-closed cache policies have different availability and data consequences.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant G as Protection\nparticipant O as Operations\n    U->>A: Many concurrent reads\nA->>C: Get keys\nC-->>A: Misses or cache errors\nA->>D: Fallback reads increase"
    },
    {
      "label": "3 Protect the backing service",
      "kicker": "STEP 3",
      "title": "Protect the backing service",
      "detail": "The application bounds concurrent work and request rates. A circuit breaker pauses calls to an unhealthy source while backpressure limits queued work.",
      "note": "A circuit breaker limits pressure; it cannot create unavailable data. Return a controlled response when no safe fallback exists.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant G as Protection\nparticipant O as Operations\n    A->>G: Apply concurrency and rate limits\nG->>D: Permit bounded reads\nD-->>G: Return capacity or health\nG-->>A: Allow, delay or reject"
    },
    {
      "label": "4 Restore cache gradually",
      "kicker": "STEP 4",
      "title": "Restore cache gradually",
      "detail": "Operators restore cache capacity and repopulate important keys at a controlled rate. Random TTL jitter and staged warmup reduce synchronized expiry and restart load.",
      "note": "Warm only measured high-value keys and rate-limit rebuilds. Jitter does not solve a complete cache outage by itself.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant G as Protection\nparticipant O as Operations\n    O->>C: Restore cache service\nA->>C: Refill prioritized keys gradually\nA->>C: Apply randomized TTL"
    },
    {
      "label": "5 Recover and review",
      "kicker": "STEP 5",
      "title": "Recover and review",
      "detail": "The team watches source and cache health, gradually restores normal traffic and verifies fallback behavior remains within policy.",
      "note": "Avoid flooding a recovering dependency when a circuit breaker closes; restore traffic gradually.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant G as Protection\nparticipant O as Operations\n    O->>D: Monitor source health\nO->>C: Monitor cache recovery\nG-->>A: Gradually restore allowed traffic\nA-->>U: Resume normal responses"
    }
  ]
};
