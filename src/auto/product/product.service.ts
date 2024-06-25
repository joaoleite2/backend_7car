import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma-service';

@Injectable()
export class ProductService {

  constructor(private readonly prismaS:PrismaService){}
  
  async create(createProductDto: CreateProductDto) {
    await this.existsItems(
      createProductDto.idModel,
      createProductDto.idProductType
    );    
    return await this.prismaS.produto.create({
      data:{
        id_Modelo:createProductDto.idModel,
        id_Tipo:createProductDto.idProductType,
        nome_Prod:createProductDto.name,
        desc_Prod:createProductDto.description,
        preco_Prod:createProductDto.price,
        qtnEstoque_Prod:createProductDto.quantity,
        imagem_Prod:createProductDto.imageUrl
      }
    });
  }

  async findAll() {
    return await this.prismaS.produto.findMany();
  }

  async findOne(id: number) {
    await this.thereAreProduct(id);
    const findProduct =  await this.prismaS.produto.findFirst({
      where: {
        id_Prod: id
      }
    });
    const findModel = await this.prismaS.modelo.findFirst({
      where:{
        id_Modelo:findProduct.id_Modelo
      }
    });
    const findBrand = await this.prismaS.marca.findFirst({
      where:{
        id_Marca:findModel.id_Marca
      },
      select:{
        nome_Marca:true
      }
    });
    const jsonToFront = {
      id_Prod: findProduct.id_Prod,
      marca:findBrand.nome_Marca,
      imagem_Prod: findProduct.imagem_Prod,
      nome_Prod:findProduct.nome_Prod,
      desc_Prod:findProduct.desc_Prod,
      preco_Prod:findProduct.preco_Prod,
      qtnEstoque_Prod:findProduct.qtnEstoque_Prod,
      modelo:findModel.nome_Modelo
    }
    return jsonToFront;
  }
  

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.thereAreProduct(id)
    return await this.prismaS.produto.update({
      where:{
        id_Prod:id
      },
      data:{        
        desc_Prod:updateProductDto.description,
        imagem_Prod:updateProductDto.imageUrl,
        nome_Prod:updateProductDto.name,
        preco_Prod:updateProductDto.price,
        qtnEstoque_Prod:updateProductDto.quantity,
      }
    });
  }

  async remove(id: number) {
    await this.thereAreProduct(id);
    return await this.prismaS.produto.delete({
      where:{
        id_Prod:id
      }
    });
  }

  async existsItems(idModel:number, idType:number):Promise<void>{
    let count = 0;
    count += await this.prismaS.modelo.count({
      where:{
        id_Modelo:idModel
      }
    });
    if(count === 0){
      throw new HttpException("Model doesn't exist", HttpStatus.NOT_FOUND);
    }
    count+= await this.prismaS.tipoproduto.count({
      where:{
        id_Tipo:idType
      }
    });
    if(count === 1){
      throw new HttpException("Type product doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
  async thereAreProduct(id:number):Promise<void>{
    const find = await this.prismaS.produto.count({
      where:{
        id_Prod:id
      }
    });
    if(!find){
      throw new HttpException("Product doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
