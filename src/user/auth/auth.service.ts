import {Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma-service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaS:PrismaService
  ) {
  }
  async create(data: any) {
    return await this.prismaS.usuario.create({
      data:{
        email_Usu:data.email,
        senha_Usu:data.password,
        status_Usu:false
      }
    })
  }
  async findOne(condition: any) {
    if(condition >= 0){
      return await this.prismaS.usuario.findFirst({
        where:{
          id_Usu:condition
        } 
      })
    }
    return await this.prismaS.usuario.findFirst({
      where:{
        email_Usu:condition
      }      
    })
  }
}