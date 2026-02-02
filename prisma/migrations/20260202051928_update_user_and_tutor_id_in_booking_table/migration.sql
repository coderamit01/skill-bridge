/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tutor_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_user_id_key" ON "Booking"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_tutor_id_key" ON "Booking"("tutor_id");
