/*
  Warnings:

  - You are about to drop the column `url` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `video_type` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `sourceType` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "url",
DROP COLUMN "video_type",
ADD COLUMN     "sourceType" TEXT NOT NULL,
ADD COLUMN     "sourceUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
