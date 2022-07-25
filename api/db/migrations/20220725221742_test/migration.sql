-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestNotification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TestNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TestNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "AnswerComment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TestNotification" ("answerId", "body", "commentId", "createdAt", "id", "questionId", "seen", "userId") SELECT "answerId", "body", "commentId", "createdAt", "id", "questionId", "seen", "userId" FROM "TestNotification";
DROP TABLE "TestNotification";
ALTER TABLE "new_TestNotification" RENAME TO "TestNotification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
