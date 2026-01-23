-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "riasecType" TEXT NOT NULL,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TravelerType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "riasecType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shareImageUrl" TEXT NOT NULL,
    "destinations" TEXT NOT NULL,
    "tips" TEXT NOT NULL,
    "trivia" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelerType_riasecType_key" ON "TravelerType"("riasecType");
