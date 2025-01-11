/*
  Warnings:

  - A unique constraint covering the columns `[borrowRequestId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "borrowRequestId" INTEGER,
ADD COLUMN     "orderBookId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Address_borrowRequestId_key" ON "Address"("borrowRequestId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_borrowRequestId_fkey" FOREIGN KEY ("borrowRequestId") REFERENCES "BorrowRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
