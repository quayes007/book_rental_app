/*
  Warnings:

  - A unique constraint covering the columns `[orderBookId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BorrowRequest_userId_bookId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Address_orderBookId_key" ON "Address"("orderBookId");

-- AddForeignKey
ALTER TABLE "OrderBook" ADD CONSTRAINT "OrderBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBook" ADD CONSTRAINT "OrderBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_orderBookId_fkey" FOREIGN KEY ("orderBookId") REFERENCES "OrderBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
