-- CreateTable
CREATE TABLE `endereco` (
    `id_End` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_End` VARCHAR(100) NULL,
    `num_End` INTEGER NULL,
    `complemento_End` VARCHAR(50) NULL,

    PRIMARY KEY (`id_End`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itempedido` (
    `id_Prod` INTEGER NOT NULL,
    `id_Ped` INTEGER NOT NULL,
    `qtn_Item` INTEGER NULL,
    `precoUnitario_Item` DECIMAL(10, 2) NULL,
    `precoTotal_Item` DECIMAL(10, 2) NULL,

    INDEX `id_Ped`(`id_Ped`),
    PRIMARY KEY (`id_Prod`, `id_Ped`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marca` (
    `id_Marca` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_Marca` VARCHAR(50) NULL,

    PRIMARY KEY (`id_Marca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modelo` (
    `id_Modelo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Marca` INTEGER NULL,
    `nome_Modelo` VARCHAR(50) NULL,

    INDEX `id_Marca`(`id_Marca`),
    PRIMARY KEY (`id_Modelo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id_Ped` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Usu` INTEGER NULL,
    `data_Ped` DATETIME(0) NULL,
    `valor_Total` DECIMAL(10, 2) NULL,

    INDEX `id_Usu`(`id_Usu`),
    PRIMARY KEY (`id_Ped`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id_Prod` INTEGER NOT NULL AUTO_INCREMENT,
    `id_Marca` INTEGER NULL,
    `id_Modelo` INTEGER NULL,
    `id_Tipo` INTEGER NULL,
    `imagem_Prod` VARCHAR(30) NULL,
    `nome_Prod` VARCHAR(30) NULL,
    `desc_Prod` VARCHAR(100) NULL,
    `preco_Prod` DECIMAL(10, 2) NULL,
    `qtnEstoque_Prod` INTEGER NULL,
    `img_Prod` VARCHAR(50) NULL,

    INDEX `id_Marca`(`id_Marca`),
    INDEX `id_Modelo`(`id_Modelo`),
    INDEX `id_Tipo`(`id_Tipo`),
    PRIMARY KEY (`id_Prod`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `telefone` (
    `id_Tel` INTEGER NOT NULL AUTO_INCREMENT,
    `DDD` CHAR(3) NULL,
    `numero_Tel` CHAR(11) NULL,

    PRIMARY KEY (`id_Tel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoproduto` (
    `id_Tipo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_Tipo` VARCHAR(30) NULL,

    PRIMARY KEY (`id_Tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_Usu` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_Usu` VARCHAR(50) NULL,
    `email_Usu` VARCHAR(50) NULL,
    `senha_Usu` VARCHAR(50) NULL,
    `id_Tel` INTEGER NULL,
    `id_End` INTEGER NULL,
    `status_Usu` BOOLEAN NULL,

    INDEX `id_End`(`id_End`),
    INDEX `id_Tel`(`id_Tel`),
    PRIMARY KEY (`id_Usu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
