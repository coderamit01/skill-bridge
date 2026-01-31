/*
  Warnings:

  - You are about to drop the column `avilable_days` on the `tutor` table. All the data in the column will be lost.
  - You are about to drop the column `slot_duration` on the `tutor` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_date` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `avilable_start_time` on table `tutor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avilable_end_time` on table `tutor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "session_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tutor" DROP COLUMN "avilable_days",
DROP COLUMN "slot_duration",
ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "avilable_start_time" SET NOT NULL,
ALTER COLUMN "avilable_end_time" SET NOT NULL;

-- DropEnum
DROP TYPE "Day";

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "age" INTEGER,
    "address" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);
