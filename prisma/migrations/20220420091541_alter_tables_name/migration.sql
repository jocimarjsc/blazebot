/*
  Warnings:

  - You are about to drop the `config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `count` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `config`;

-- DropTable
DROP TABLE `count`;

-- CreateTable
CREATE TABLE `configs` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `default` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counts` (
    `id` VARCHAR(191) NOT NULL,
    `countGreen` INTEGER NOT NULL,
    `countWhite` INTEGER NOT NULL,
    `countRed` INTEGER NOT NULL,
    `countGale1` INTEGER NOT NULL,
    `countGale2` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
