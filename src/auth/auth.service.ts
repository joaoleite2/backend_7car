import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    // private readonly jwtService :JwtService 
  ) {}
  async validateUser(email:string, pass:string):Promise<any>{
    // const user = await 
  }
}
