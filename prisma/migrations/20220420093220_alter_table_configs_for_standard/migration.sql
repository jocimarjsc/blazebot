/*
  Warnings:

  - You are about to drop the column `default` on the `configs` table. All the data in the column will be lost.
  - Added the required column `standard` to the `configs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `configs` DROP COLUMN `default`,
    ADD COLUMN `standard` INTEGER NOT NULL;
