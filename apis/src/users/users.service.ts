import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async updatePassword(userId: number, newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
  }
  usersRepository: any;
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto reçu :', createUserDto); // 👈 ajoute ça
  
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }


  // Autres méthodes...
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  
  async saveResetToken(userId: string, token: string, expiry: Date) {
    return this.prisma.user.update({
      where: { id: Number(userId) },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiry: expiry,
      },
    });
  }
}
