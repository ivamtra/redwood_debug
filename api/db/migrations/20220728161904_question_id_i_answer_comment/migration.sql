-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnswerComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "answerId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AnswerComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerComment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AnswerComment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnswerComment" ("answerId", "body", "createdAt", "id", "isHidden", "level", "parentId", "rating", "userId") SELECT "answerId", "body", "createdAt", "id", "isHidden", "level", "parentId", "rating", "userId" FROM "AnswerComment";
DROP TABLE "AnswerComment";
ALTER TABLE "new_AnswerComment" RENAME TO "AnswerComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
