/*
  Warnings:

  - You are about to drop the `pedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `produto` MODIFY `desc_Prod` VARCHAR(400) NULL;

-- DropTable
DROP TABLE `pedido`;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_id_Marca_fkey` FOREIGN KEY (`id_Marca`) REFERENCES `marca`(`id_Marca`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_id_Modelo_fkey` FOREIGN KEY (`id_Modelo`) REFERENCES `modelo`(`id_Modelo`) ON DELETE SET NULL ON UPDATE CASCADE;
