import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, username: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your Email',
      template: './email-confirmation',
      context: {
        username,
        code,
      },
    });
  }
}
