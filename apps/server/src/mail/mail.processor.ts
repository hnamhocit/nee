import { MailerService } from '@nestjs-modules/mailer';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { IConfirmationJobData, MailJobName } from './mail.interfaces';

@Processor('mail')
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<any, any, MailJobName>): Promise<any> {
    switch (job.name) {
      case MailJobName.CONFIRMATION:
        await this.handleSendConfirmationEmail(
          job as Job<IConfirmationJobData>,
        );
        break;
      default:
        console.warn(`Unknown job: ${job.name}`);
    }
  }

  private async handleSendConfirmationEmail(job: Job<IConfirmationJobData>) {
    const { email, username, code } = job.data;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your Email',
      template: './email-confirmation',
      context: {
        username,
        code,
      },
    });

    console.log(
      `✅ [Worker] Send confirmation email to ${username} (${email}) successfully.`,
    );
  }
}
