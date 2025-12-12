import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  async sendConfirmationEmail(email: string, username: string, code: string) {
    await this.mailQueue.add(
      'send-confirmation-email',
      {
        email,
        username,
        code,
      },
      {
        delay: 5000,
        attempts: 3,
        backoff: 5000,
        removeOnComplete: true,
      },
    );
  }
}
