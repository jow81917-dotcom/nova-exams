/*
  Warnings:

  - You are about to drop the column `content` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `testimonial` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "content",
ADD COLUMN     "testimonial" TEXT NOT NULL;
