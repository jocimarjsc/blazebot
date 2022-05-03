/*
  Warnings:

  - You are about to drop the column `color` on the `colors` table. All the data in the column will be lost.
  - Added the required column `colorName` to the `Colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `colors` DROP COLUMN `color`,
    ADD COLUMN `colorName` VARCHAR(191) NOT NULL;
