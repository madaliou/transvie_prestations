import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: hashedPassword,
      },
    });

    return this.buildToken(user.id, user.email, user.firstname, user.lastname);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe invalide.');
    }

    return this.buildToken(user.id, user.email, user.firstname, user.lastname);
  }

  private async buildToken(
    userId: number,
    email: string,
    firstname: string,
    lastname: string,
  ) {
    const payload = { userId, email };
    const token = await this.jwt.signAsync(payload, { expiresIn: '0' });
    //const token = await this.jwt.signAsync(payload, { expiresIn: '1h' });

    return {
      access_token: token,
      user: { id: userId, email, firstname, lastname },
    };
  }
}
