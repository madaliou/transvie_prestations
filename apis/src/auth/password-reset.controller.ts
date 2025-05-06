import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';


@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request')
  @HttpCode(200)
  async requestReset(@Body('email') email: string): Promise<{ message: string }> {
    await this.passwordResetService.requestReset(email);
    return { message: 'Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.' };
  }

  @Post('reset')
  @HttpCode(200)
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ success: boolean }> {
    const success = await this.passwordResetService.resetPassword(token, newPassword);
    return { success };
  }
}