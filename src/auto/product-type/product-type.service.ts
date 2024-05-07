import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma-service';

@Injectable()
export class ProductTypeService {
  constructor (private readonly prismaS:PrismaService){}
  
  async create(productType) {
    try{
      return await this.prismaS.tipoproduto.create({
        data:{
          nome_Tipo:productType
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE)
    };
  }
  async findAll() {
    try{
      return await this.prismaS.tipoproduto.findMany();
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE)
    };
  }

  async findOne(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.tipoproduto.findFirst({
        where:{
          id_Tipo:id
        }
      }) 
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE)
    };
  }

  async update(id: number, productType) {
    await this.exists(id);
    try{
      return await this.prismaS.tipoproduto.update({
        where:{
          id_Tipo:id
        },
        data:{
          nome_Tipo:productType
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  async remove(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.tipoproduto.delete({
        where:{
          id_Tipo:id
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE)
    };
  }

  async exists(id:number){
    const find = await this.prismaS.tipoproduto.count({
      where:{
        id_Tipo:id
      }
    })
    if(!find)
      throw new HttpException(`${id} does not exist`,HttpStatus.NOT_FOUND);
  }
}
