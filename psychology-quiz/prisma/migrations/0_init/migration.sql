-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RiasecType" AS ENUM ('REALISTIC', 'INVESTIGATIVE', 'ARTISTIC', 'SOCIAL', 'ENTERPRISING', 'CONVENTIONAL');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "riasecType" "RiasecType" NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelerType" (
    "id" TEXT NOT NULL,
    "riasecType" "RiasecType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shareImageUrl" TEXT NOT NULL,
    "destinations" TEXT NOT NULL,
    "tips" TEXT NOT NULL,
    "trivia" TEXT NOT NULL,

    CONSTRAINT "TravelerType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelerType_riasecType_key" ON "TravelerType"("riasecType");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

