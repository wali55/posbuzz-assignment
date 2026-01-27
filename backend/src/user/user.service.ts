import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(registerDto: RegisterDto) {
    const { first_name, last_name, email, password } = registerDto;
    try {
      const result = await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      const DUPLICATE_KEY_CODE = 'P2002';
      if (error.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException(
          'A record with this information already exists.',
        );
      }

      throw error;
    }
  }

  async findUser(loginDto: LoginDto) {
    try {
      const { email } = loginDto;

      const result = await this.prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!result) {
        throw new NotFoundException("User with this email not found!");
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException("User with this email not found!");
    }
  }
}