import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const saltRound = 10;
        const hash = await bcrypt.hash(registerDto.password, saltRound);
        const user = await this.userService.createUser({...registerDto, password: hash});

        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {access_token: token}
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findUser(loginDto);
        const matched = await bcrypt.compare(loginDto.password, user?.password as string);

        if (!user || !matched) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id };
        const token = await this.jwtService.signAsync(payload);
        return {access_token: token}
    }
}