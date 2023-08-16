/*
  Warnings:

  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_hash` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "body",
DROP COLUMN "is_public",
DROP COLUMN "title",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "TicketStatus" NOT NULL,
ADD COLUMN     "transaction_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tickets_count" INTEGER NOT NULL DEFAULT 0;
