-- DropForeignKey
ALTER TABLE `cartproduct` DROP FOREIGN KEY `CartProduct_productId_fkey`;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
