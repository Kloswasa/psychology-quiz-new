-- AlterTable
ALTER TABLE "Question" ADD COLUMN "backgroundImage" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN "imageUrl" TEXT;
