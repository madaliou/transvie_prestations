import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'Tempor@ire2', // À remplacer par une variable d'environnement
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email', // ou votre SMTP
        port: 587, // Port pour MailDev en local
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }),
  ],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}