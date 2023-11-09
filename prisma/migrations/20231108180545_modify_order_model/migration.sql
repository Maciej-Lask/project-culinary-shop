/*
  Warnings:

  - You are about to drop the `_ordertoproduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_ordertoproduct`;

-- CreateTable
CREATE TABLE `CartProduct` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
