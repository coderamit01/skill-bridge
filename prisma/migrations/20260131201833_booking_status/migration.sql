/*
  Warnings:

  - Added the required column `status` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('CONFIRMED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "status" "BookStatus" NOT NULL;
