-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
