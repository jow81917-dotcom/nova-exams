/*
  Warnings:

  - You are about to drop the column `name` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `exam` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "name",
DROP COLUMN "rating",
DROP COLUMN "role",
ADD COLUMN     "exam" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "score" TEXT NOT NULL,
ADD COLUMN     "student" TEXT NOT NULL;
