/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_uuid` on the `Post` table. All the data in the column will be lost.
  - The required column `transaction_uuid` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "post_uuid",
ADD COLUMN     "transaction_uuid" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("transaction_uuid");
