/*
  Warnings:

  - You are about to drop the column `created_by` on the `BookGeneres` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `BookGeneres` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `BookGeneres` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `shortDescription` to the `BookGeneres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookGeneres" DROP COLUMN "created_by",
DROP COLUMN "parent_id",
DROP COLUMN "short_description",
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "shortDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "BookGeneres" ADD CONSTRAINT "BookGeneres_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "BookGeneres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookGeneres" ADD CONSTRAINT "BookGeneres_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
