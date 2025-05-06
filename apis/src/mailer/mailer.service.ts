import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  sendMail(to: string, subject: string, html: string) {
    throw new Error('Method not implemented.');
  }
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'walter.lynch56@ethereal.email', // Remplacez par votre user Ethereal
        pass: 'GsgPsfaw3aYVWPvADd', // Remplacez par votre mot de passe Ethereal
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetLink: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"TRansvie App" <no)reply@monapp.com>',
        to: email,
        subject: 'Réinitialisation de mot de passe',
        html: `
          <p>Vous avez demandé une réinitialisation de mot de passe.</p>
          <p>Cliquez <a href="${resetLink}">ici</a> pour définir un nouveau mot de passe.</p>
          <p>Ce lien expirera dans 1 heure.</p>
        `,
      });
      
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      return true;
    } catch (error) {
      console.error('❌ Erreur:', error);
      return false;
    }
  }
}