/*
  Warnings:

  - You are about to drop the column `productId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_productId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `productId`;
