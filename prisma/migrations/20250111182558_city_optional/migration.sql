/*
  Warnings:

  - The values [processing] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('on_the_way', 'in_rent', 'returning', 'complete');
ALTER TABLE "BorrowRequest" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "OrderBook" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
COMMIT;

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "city" DROP NOT NULL;
