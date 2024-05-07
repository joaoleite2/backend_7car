import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { PrismaService } from 'src/prisma/prisma-service';

@Injectable()
export class BrandService {
  constructor(
    private readonly prismaS:PrismaService
  ){}
  
  async create(brand) {
    try{
      return await this.prismaS.marca.create({
        data:{
          nome_Marca:brand
        }
      })
    }catch(error){
      throw new HttpException('error',HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try{
      return await this.prismaS.marca.findMany();
    }catch(error){
      throw new HttpException('error',HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.marca.findFirst({
        where:{
          id_Marca:id
        }
      })
    }catch(error){
      throw new HttpException('error',HttpStatus.NO_CONTENT);
    }
  }

  async update(id: number, brand) {
    await this.exists(id);
    try{
      return await this.prismaS.marca.update({
        data:{
          nome_Marca:brand
        },
        where:{
          id_Marca:id
        }
      })
    }catch(eror){
      throw new HttpException('connection error', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.marca.delete({
        where:{
          id_Marca:id
        }
      })
    }catch(error){
      throw new HttpException('error',HttpStatus.BAD_REQUEST)
    }
  }

  async exists(id:number){
    const find = await this.prismaS.marca.count({
      where:{
        id_Marca:id
      }
    })
    if(!find)
      throw new HttpException(`${id} does not exist`,HttpStatus.NOT_FOUND)
  }
}
