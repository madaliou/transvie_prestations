import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,PrismaService],
})
export class AuthModule {}