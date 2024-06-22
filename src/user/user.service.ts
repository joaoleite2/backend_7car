import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma-service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaS:PrismaService
  ){}
  async create(createUserDto: CreateUserDto) {
    await this.thereAreUserEmail(createUserDto.userEmail);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 14);

    return await this.prismaS.usuario.create({
      data:{
        email_Usu:createUserDto.userEmail,
        nome_Usu:createUserDto.userName,
        senha_Usu:hashedPassword,
        status_Usu: true
      },
      select:{
        email_Usu:true,
        nome_Usu:true,
      }
    });
  }

  async findAll() {
    return await this.prismaS.usuario.findMany();
  }

  async findOne(id: number) {
    await this.thereAreUser(id);
    return await this.prismaS.usuario.findFirst({
      where:{
        id_Usu:id
      }
    });
  }

  async update(id: number, body) {
    await this.thereAreUser(id);
    let hashedPassword = null;
    if(body.senha_Usu){
      hashedPassword = await bcrypt.hash(body.senha_Usu,14);
    }

    return await this.prismaS.usuario.update({
      where:{
        id_Usu:id
      },
      data:{
        email_Usu:body.email_Usu,
        nome_Usu:body.nome_Usu,
        senha_Usu: hashedPassword || body.senha_Usu
      },
      select:{
        nome_Usu:true
      }
    })
  }

  async remove(id: number) {
    await this.thereAreUser(id);
    return await this.prismaS.usuario.delete({
      where:{
        id_Usu:id
      },
      select:{
        email_Usu:true
      }
    });
  }

  async thereAreUserEmail(email:string){
    const find = await this.prismaS.usuario.count({
      where:{
        email_Usu:email
      }
    });
    if(find){
      throw new HttpException ('User already exists', HttpStatus.CONFLICT);
    }
  }

  async thereAreUser(id:number):Promise<void>{
    const find = await this.prismaS.usuario.count({
      where:{
        id_Usu:id
      }
    });
    if(!find){
      throw new HttpException(`User doesn't exists`,HttpStatus.NOT_FOUND);
    }
  }  
}
