import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PasswordResetService {
constructor(
private usersService: UsersService,
private jwtService: JwtService,
private mailerService: MailerService,
) {}

async requestReset(email: string): Promise<void> {
const user = await this.usersService.findOneByEmail(email);
if (!user) {
// Ne pas révéler que l'email n'existe pas
return;
}

const token = this.jwtService.sign(
{ sub: user.id },
{ expiresIn: '1h' },
);

const resetLink = `http://localhost:3000/reset-password?token=${token}`;

await this.mailerService.sendMail({
to: email,
subject: 'Réinitialisation de votre mot de passe',
template: 'reset-password', // Créez ce template
context: {
name: user.lastname,
resetLink,
},
});
}

async resetPassword(token: string, newPassword: string): Promise<boolean> {
try {
const payload = this.jwtService.verify(token);
const userId = payload.sub;

await this.usersService.updatePassword(userId, newPassword);
return true;
} catch (e) {
return false;
}
}
}
