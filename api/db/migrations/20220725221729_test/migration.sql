/*
  Warnings:

  - Made the column `answerId` on table `TestNotification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `commentId` on table `TestNotification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionId` on table `TestNotification` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TestNotification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TestNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TestNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "AnswerComment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestNotification" ("answerId", "body", "commentId", "createdAt", "id", "questionId", "seen", "userId") SELECT "answerId", "body", "commentId", "createdAt", "id", "questionId", "seen", "userId" FROM "TestNotification";
DROP TABLE "TestNotification";
ALTER TABLE "new_TestNotification" RENAME TO "TestNotification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
