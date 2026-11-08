module.exports = {
  "steps": [
    {
      "label": "1 Follow",
      "kicker": "FOLLOW",
      "title": "A reader follows an author",
      "detail": "The reader requests a follow. The app checks the accounts and product rules, then saves the relationship so feed queries can find the author.",
      "note": "Private accounts may require approval; blocks and unfollows also change visibility.",
      "diagram": "sequenceDiagram\n    actor R as Reader\n    actor A as Author\n    participant S as Social app\n    participant D as Database\n    R->>S: Request follow\n    S->>D: Save follow\n    D-->>S: Save result\n    S-->>R: Follow result"
    },
    {
      "label": "2 Publish",
      "kicker": "PUBLISH",
      "title": "An author publishes a post",
      "detail": "The author submits text, media references, and visibility. The app validates and saves the post, then returns the result.",
      "note": "Media upload and processing can happen separately; a successful post does not mean delivery or notifications have finished.",
      "diagram": "sequenceDiagram\n    actor R as Reader\n    actor A as Author\n    participant S as Social app\n    participant D as Database\n    A->>S: Submit post and visibility\n    S->>D: Save post\n    D-->>S: Save result\n    S-->>A: Publish result"
    },
    {
      "label": "3 Read feed",
      "kicker": "FEED",
      "title": "The reader loads visible posts",
      "detail": "The reader opens the feed. The app queries candidates from followed authors, checks current access, sorts by time, and returns a page.",
      "note": "This example builds on read; deletion, blocks, or visibility changes can make a previously visible post inaccessible.",
      "diagram": "sequenceDiagram\n    actor R as Reader\n    actor A as Author\n    participant S as Social app\n    participant D as Database\n    R->>S: Request feed\n    S->>D: Query follows and candidate posts\n    D-->>S: Candidate data\n    Note over S: Check access and sort\n    S-->>R: Return a page of posts"
    },
    {
      "label": "4 Interact",
      "kicker": "INTERACT",
      "title": "The reader likes or comments",
      "detail": "The reader interacts with a post they can access. The app saves the like or comment and may notify the author asynchronously according to policy.",
      "note": "Repeated requests and job retries need protection against duplicate likes and notifications; notifications may be delayed or omitted.",
      "diagram": "sequenceDiagram\n    actor R as Reader\n    actor A as Author\n    participant S as Social app\n    participant D as Database\n    R->>S: Submit like or comment\n    S->>D: Save interaction\n    D-->>S: Save result\n    S-->>R: Interaction result\n    opt Notification policy allows\n      S->>A: Send notification\n    end"
    }
  ]
};
