-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserLikesComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "action" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "questionId" INTEGER DEFAULT 0,
    CONSTRAINT "UserLikesComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserLikesComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "AnswerComment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserLikesComment" ("action", "commentId", "dateTime", "id", "questionId", "userId") SELECT "action", "commentId", "dateTime", "id", "questionId", "userId" FROM "UserLikesComment";
DROP TABLE "UserLikesComment";
ALTER TABLE "new_UserLikesComment" RENAME TO "UserLikesComment";
CREATE UNIQUE INDEX "UserLikesComment_userId_commentId_key" ON "UserLikesComment"("userId", "commentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
