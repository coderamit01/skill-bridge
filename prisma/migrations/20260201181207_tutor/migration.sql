-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
