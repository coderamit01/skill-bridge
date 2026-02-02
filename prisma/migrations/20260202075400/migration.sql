/*
  Warnings:

  - You are about to alter the column `price` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `hourly_rate` on the `Tutor` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `experience_years` on the `Tutor` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `avg_rating` on the `Tutor` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Tutor" ALTER COLUMN "hourly_rate" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "experience_years" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "avg_rating" SET DATA TYPE DECIMAL(10,2);
