/*
  Warnings:

  - A unique constraint covering the columns `[tutorId]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "availabilities_tutorId_key" ON "availabilities"("tutorId");
