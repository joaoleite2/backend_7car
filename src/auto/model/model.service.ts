import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma-service';

@Injectable()
export class ModelService {
  constructor(
    private readonly prismaS:PrismaService,
  ){}

  async create(model,idBrand) {
    await this.brandExists(idBrand);
    try{
      return await this.prismaS.modelo.create({
        data:{
          id_Marca:idBrand,
          nome_Modelo:model
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async findAll() {
    try{
      return await this.prismaS.modelo.findMany();
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async findOne(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.modelo.findFirst({
        where:{
          id_Modelo:id
        }
      });
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async update(id: number, model:string) {
    await this.exists(id);
    try{
      return await this.prismaS.modelo.update({
        where:{
          id_Modelo:id
        },
        data:{
          nome_Modelo:model
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async remove(id: number) {
    await this.exists(id);
    try{
      return await this.prismaS.modelo.delete({
        where:{
          id_Modelo:id
        }
      })
    }catch(error){
      throw new HttpException('connection error',HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async exists(id:number){
    const find = await this.prismaS.modelo.count({
      where:{
        id_Modelo:id
      }
    })
    if(!find)
      throw new HttpException(`${id} does not exist`,HttpStatus.NOT_FOUND)
  }
  async brandExists(id:number){
    const find = await this.prismaS.marca.count({
      where:{
        id_Marca:id
      }
    })
    if(!find)
      throw new HttpException(`${id} does not exist`,HttpStatus.NOT_FOUND);
  }
}
