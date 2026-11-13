module.exports = {
  "steps": [
    {
      "label": "1 Read the hot key",
      "kicker": "STEP 1",
      "title": "Read the hot key",
      "detail": "A request checks a frequently used key. If the value is present and fresh, the application returns it without reading the database.",
      "note": "Many requests depend on the same popular key.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant L as Coordinator\n    U->>A: Request popular item\nA->>C: Read key\nC-->>A: Return cached value"
    },
    {
      "label": "2 Concurrent requests miss",
      "kicker": "STEP 2",
      "title": "Concurrent requests miss",
      "detail": "The key expires or is evicted. Concurrent requests can all observe a miss and independently query the database, creating a burst of duplicate work.",
      "note": "Expiry is common, but eviction and cold starts can cause the same pattern.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant L as Coordinator\n    U->>A: Concurrent requests for same key\nA->>C: Read key\nC-->>A: Cache miss"
    },
    {
      "label": "3 Coalesce the refill",
      "kicker": "STEP 3",
      "title": "Coalesce the refill",
      "detail": "The application elects one request to load the value. Other requests wait for its in-flight result or use an allowed stale value instead of starting duplicate reads.",
      "note": "Process-local singleflight does not coordinate other instances. Distributed locks need bounded waits, expiry and failure handling.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant L as Coordinator\n    A->>L: Join or create refill for key\nL-->>A: Elect refill leader\nA->>D: Load value once\nD-->>A: Return value"
    },
    {
      "label": "4 Publish refreshed data",
      "kicker": "STEP 4",
      "title": "Publish refreshed data",
      "detail": "The leader stores the new result with an appropriate expiration and shares it with waiting callers.",
      "note": "Use atomic publication or fencing when needed so a delayed old refill cannot overwrite newer data.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant L as Coordinator\n    A->>C: Store refreshed value with TTL\nA-->>L: Complete in-flight refill\nL-->>U: Share loaded value"
    },
    {
      "label": "5 Handle source failure",
      "kicker": "STEP 5",
      "title": "Handle source failure",
      "detail": "If the source is slow or unavailable, bound wait time and use an explicit fallback, such as brief stale serving when safe. Concurrency limits protect the database.",
      "note": "Stale data is only acceptable when the business permits it. A lock reduces duplicate work but cannot make the database faster.",
      "diagram": "sequenceDiagram\n    actor U as User\nparticipant A as Application\nparticipant C as Cache\nparticipant D as Database\nparticipant L as Coordinator\n    opt Fresh value loaded\nA-->>U: Return refreshed value\nelse Source delayed or unavailable\nA-->>U: Return allowed stale value or controlled error\nend"
    }
  ]
};
