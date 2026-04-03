/*
  Warnings:

  - Made the column `rating` on table `Testimonial` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "readTime" TEXT;

-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 5;
