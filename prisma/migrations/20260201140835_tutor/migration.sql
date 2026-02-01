/*
  Warnings:

  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `tutor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "school" TEXT;

-- DropTable
DROP TABLE "student";

-- CreateIndex
CREATE UNIQUE INDEX "tutor_user_id_key" ON "tutor"("user_id");
