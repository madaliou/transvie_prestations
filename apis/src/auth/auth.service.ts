import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as dayjs from 'dayjs';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,

  ) {} // ✅ injection correcte

  login(dto: LoginDto) {
    throw new Error('Method not implemented.');
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        agenceId: Number(createUserDto.agenceId),
      },
    });
    return user; // ✅ n'oublie pas de retourner l'utilisateur
  }

  async sendPasswordResetEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log('the user is : ', user)
  
    if (!user) {
      throw new NotFoundException("Cette adresse n'existe pas.");
    }
  
    // Génère un token sécurisé
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = dayjs().add(1, 'hour').toDate();
  
    // Stocke le token dans la base (assure-toi que le modèle user a ces champs)
    await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: expires,
      },
    });
  
    // Construit le lien de réinitialisation
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  
    // Envoie le mail via le MailerService
    const sent = await this.mailerService.sendPasswordResetEmail(email, resetLink);
  
    if (!sent) {
      throw new BadRequestException("Erreur lors de l'envoi du mail.");
    }
  
    return { message: `Un email de réinitialisation a été envoyé à ${email}` };
  }
  
  }
