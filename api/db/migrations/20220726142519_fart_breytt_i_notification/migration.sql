/*
  Warnings:

  - You are about to drop the `Fart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fart";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "isSeen" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL DEFAULT 0,
    "answerId" INTEGER NOT NULL DEFAULT 0,
    "answerCommentId" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notification_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notification_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notification_answerCommentId_fkey" FOREIGN KEY ("answerCommentId") REFERENCES "AnswerComment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
