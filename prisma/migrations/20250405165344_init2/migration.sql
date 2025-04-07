/*
  Warnings:

  - Added the required column `endDate` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
