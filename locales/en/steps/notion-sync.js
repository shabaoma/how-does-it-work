module.exports = {
  "steps": [
    {
      "label": "1 Download page",
      "kicker": "DOWNLOAD",
      "title": "A device downloads a page",
      "detail": "Device A marks a page available offline. The client downloads records needed to render it and saves them in persistent local storage.",
      "note": "The download setting is device-specific; prepare the page on each device that needs offline access.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    A->>S: Request page and required records\n    S-->>A: Return page data\n    Note over A: Save in local storage"
    },
    {
      "label": "2 Edit locally",
      "kicker": "EDIT",
      "title": "The device saves an offline edit",
      "detail": "After losing connectivity, the user edits the downloaded page on device A. The client saves the change locally until connectivity returns.",
      "note": "The edit has not reached the service, so other devices cannot see it yet.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    Note over A: Edit and save offline"
    },
    {
      "label": "3 Upload changes",
      "kicker": "UPLOAD",
      "title": "The device syncs after reconnecting",
      "detail": "When device A reconnects, it synchronizes its offline changes with the service. The service processes them so other devices can obtain the updated page.",
      "note": "Concurrent text and non-text edits are handled differently; do not assume every change will survive a conflict.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    A->>S: Sync offline changes\n    S-->>A: Sync result"
    },
    {
      "label": "4 Notify and fetch",
      "kicker": "FETCH",
      "title": "Another device fetches the update",
      "detail": "After applying a batch of page updates, the service publishes a page notification. Online device B, subscribed to that offline page, receives it, fetches the latest changes, and updates local data.",
      "note": "The notification signals a change; device B needs a connection to receive it and fetch the data.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    S->>B: Page update notification\n    B->>S: Request latest changes\n    S-->>B: Return page changes\n    Note over B: Update local data"
    },
    {
      "label": "5 Catch up",
      "kicker": "CATCH UP",
      "title": "A reconnecting device checks versions",
      "detail": "If device B was offline during the update, it compares each offline page’s local download timestamp with the server’s update time on reconnect, fetching only pages that are newer on the server.",
      "note": "This is Notion’s published catch-up approach for offline pages; other clients or pages may work differently.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    B->>S: Check page update time\n    S-->>B: Return version time\n    opt Server page is newer\n      B->>S: Request latest page\n      S-->>B: Return page data\n    end"
    },
    {
      "label": "6 Merge edits",
      "kicker": "MERGE",
      "title": "Concurrent text edits can merge",
      "detail": "When devices edit text concurrently, Notion uses a conflict-free replicated data type (CRDT) for rich text, including splitting and merging across blocks. Clients can converge on the merged result after synchronization.",
      "note": "CRDTs do not guarantee lossless merging for every non-text field; check the final content after a conflict.",
      "diagram": "sequenceDiagram\n    participant A as Device A\n    participant S as Notion service\n    participant B as Device B\n    A->>S: Submit text edit A\n    B->>S: Submit concurrent text edit B\n    Note over S: Merge text edits\n    B->>S: Fetch merged result\n    S-->>B: Return merged result"
    }
  ]
};
