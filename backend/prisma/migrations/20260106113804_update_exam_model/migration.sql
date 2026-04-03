/*
  Warnings:

  - You are about to drop the column `created_at` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `exam_room_service` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `exam_type` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `examType` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "created_at",
DROP COLUMN "exam_room_service",
DROP COLUMN "exam_type",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "examRoomService" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "examType" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
