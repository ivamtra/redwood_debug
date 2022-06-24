/*
  Warnings:

  - You are about to drop the column `questionId` on the `UserLikesComment` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `UserLikesComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserLikesComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    CONSTRAINT "UserLikesComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserLikesComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "AnswerComment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserLikesComment" ("action", "dateTime", "id", "userId") SELECT "action", "dateTime", "id", "userId" FROM "UserLikesComment";
DROP TABLE "UserLikesComment";
ALTER TABLE "new_UserLikesComment" RENAME TO "UserLikesComment";
CREATE UNIQUE INDEX "UserLikesComment_userId_commentId_key" ON "UserLikesComment"("userId", "commentId");
CREATE TABLE "new_Issue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL DEFAULT 0,
    "answerId" INTEGER NOT NULL DEFAULT 0,
    "answerCommentId" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Issue_answerCommentId_fkey" FOREIGN KEY ("answerCommentId") REFERENCES "AnswerComment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("answerCommentId", "answerId", "description", "id", "questionId") SELECT "answerCommentId", "answerId", "description", "id", "questionId" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
