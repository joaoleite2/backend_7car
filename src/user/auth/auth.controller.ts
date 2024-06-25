import {BadRequestException, Body, ConflictException, Controller, Get, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(@Body() {email,password}) {
        const find = await this.authService.findOne(email);
        if(find){
            throw new ConflictException;
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.authService.create({
            email,
            password: hashedPassword
        });

        return user;
    }

    @Post('login')
    async login(
        @Body() {email,password},
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.authService.findOne(email);

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(password, user.senha_Usu)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id_Usu});

        response.cookie('jwt', jwt, {httpOnly: true});

        return {
            message: 'success'
        };
    }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.authService.findOne(data['id']);

            const {senha_Usu, ...result} = user;
            return result;

            } catch (e) {
                throw new UnauthorizedException();
            }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
}