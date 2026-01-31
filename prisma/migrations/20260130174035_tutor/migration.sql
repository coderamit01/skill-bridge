/*
  Warnings:

  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status",
ADD COLUMN     "is_banned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "hourly_rate" DECIMAL(65,30) DEFAULT 0,
    "experience_years" DECIMAL(65,30) DEFAULT 0,
    "education" TEXT,
    "category_id" TEXT NOT NULL,
    "avg_rating" DECIMAL(65,30) DEFAULT 0,
    "avilable_days" "Day" NOT NULL,
    "avilable_start_time" TIMESTAMP(3),
    "avilable_end_time" TIMESTAMP(3),
    "slot_duration" DECIMAL(65,30) DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_pkey" PRIMARY KEY ("id")
);
