import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma-service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly prismaS:PrismaService,
    private readonly jwtService :JwtService 
  ) {}
  async validateUser(email:string, password:string):Promise<any>{
    const user = await this.prismaS.usuario.findFirst({
      where:{
        email_Usu:email,
      }
    });
    if(user && await bcrypt.compare(password,user.senha_Usu)){
      const {senha_Usu, ...result} = user;
      return result;
    }
    throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
  }

  async login (user:any){
    const payload = {username: user.email_Usu, sub: user.id_Usu};
    return {
      access_token:this.jwtService.sign(payload),
    }
  }
}
