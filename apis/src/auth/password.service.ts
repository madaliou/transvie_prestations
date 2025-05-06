// src/auth/password.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  async requestPasswordReset(email: string) {
    // 1. Vérifier si l'email existe en base
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      console.log('⚠️ Email non trouvé');
      return { success: false, message: 'Email non enregistré' };
    }

    // 2. Générer un token de réinitialisation (exemple simplifié)
    const resetToken = generateSecureToken(); // À implémenter
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 3. Envoyer l'email
    const emailSent = await this.mailerService.sendPasswordResetEmail(email, resetLink);
    
    return {
      success: emailSent,
      message: emailSent 
        ? 'Email envoyé (vérifiez Ethereal)' 
        : 'Échec d\'envoi',
    };
  }
}

// Helper pour générer un token
function generateSecureToken() {
  return require('crypto').randomBytes(32).toString('hex');
}
