import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('sendmail')
  async sendmail(@Body() dto: SendMailDto) {
    console.log('📨 Controller received:', dto);

    const resp = await this.mailerService.sendMail(dto.to, dto.subject, dto.html);

    return resp;
  }
}