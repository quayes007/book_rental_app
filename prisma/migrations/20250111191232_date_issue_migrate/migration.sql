/*
  Warnings:

  - You are about to drop the column `endDate` on the `OrderBook` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `OrderBook` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BorrowRequest_userId_key";

-- DropIndex
DROP INDEX "OrderBook_userId_key";

-- AlterTable
ALTER TABLE "OrderBook" DROP COLUMN "endDate",
DROP COLUMN "startDate";
