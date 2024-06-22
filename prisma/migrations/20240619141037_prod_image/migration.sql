/*
  Warnings:

  - You are about to drop the column `img_Prod` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `img_Prod`,
    MODIFY `imagem_Prod` VARCHAR(120) NULL;
