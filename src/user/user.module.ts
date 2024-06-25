import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma-service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService],
  exports:[UserService],
  imports: [AuthModule]
})
export class UserModule {}
