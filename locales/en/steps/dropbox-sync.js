module.exports = {
  "steps": [
    {
      "label": "1 Save file",
      "kicker": "SAVE",
      "title": "Computer A detects a local edit",
      "detail": "The user saves a file in the Dropbox folder on computer A. The running client detects the local change and prepares to synchronize the new content and file state to the cloud.",
      "note": "The file must be within the sync scope; upload may be delayed if the client is stopped or cannot read the file.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    Note over A: Save file and detect change"
    },
    {
      "label": "2 Upload blocks",
      "kicker": "UPLOAD",
      "title": "The client uploads required blocks",
      "detail": "The client organizes file content into blocks and exchanges sync information with the service, transferring data needed to complete synchronization. Dropbox has described blocks up to 4 MiB, with a potentially smaller final block.",
      "note": "Block transfers can reduce data transferred, but do not guarantee that only the exact bytes edited are sent.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    A->>S: Upload required file blocks\n    S-->>A: Receipt result"
    },
    {
      "label": "3 Commit state",
      "kicker": "COMMIT",
      "title": "The service records the new file state",
      "detail": "Once the required blocks are available, the client commits the file state. The service updates file metadata, making the new file version available to other devices.",
      "note": "Metadata such as name and size is separate from content blocks; starting an upload does not mean synchronization is complete.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    A->>S: Commit file state\n    S-->>A: Confirm file state"
    },
    {
      "label": "4 Discover changes",
      "kicker": "DISCOVER",
      "title": "Another computer queries changes",
      "detail": "The service notifies online computer B of an update. Computer B queries changes since its previous sync position to learn whether files were created, changed, moved, or deleted.",
      "note": "Dropbox’s historical published architecture used long-poll notifications and cursor-based queries; client implementations can change.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    S->>B: Notify of update\n    B->>S: Query changes after sync position\n    S-->>B: Return file changes"
    },
    {
      "label": "5 Fetch file",
      "kicker": "DOWNLOAD",
      "title": "Computer B obtains the required data",
      "detail": "Computer B uses the file state to fetch required blocks and writes the new version locally. The user can then open the updated file on that computer.",
      "note": "Selective sync and online-only settings affect whether content is downloaded locally; an online-only file may download when opened.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    B->>S: Request required blocks\n    S-->>B: Return blocks\n    Note over B: Update local file"
    },
    {
      "label": "6 Resolve conflicts",
      "kicker": "CONFLICT",
      "title": "Reconnect and handle conflicts",
      "detail": "An offline device keeps edits locally and synchronizes with the cloud after reconnecting. If both computers edit the same ordinary file before syncing, Dropbox may create a conflicted copy for the user to compare and merge manually.",
      "note": "Block transfers do not imply semantic merging of file contents. Check sync status before handling or deleting conflicted copies.",
      "diagram": "sequenceDiagram\n    participant A as Computer A\n    participant S as Dropbox service\n    participant B as Computer B\n    Note over A: Edit file offline\n    Note over B: Edit same file concurrently\n    B->>S: Sync edit\n    A->>S: Reconnect and sync edit\n    S-->>A: Conflicted copy appears"
    }
  ]
};
