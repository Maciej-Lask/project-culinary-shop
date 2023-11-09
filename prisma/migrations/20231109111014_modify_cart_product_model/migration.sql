/*
  Warnings:

  - Added the required column `price` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartproduct` ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
