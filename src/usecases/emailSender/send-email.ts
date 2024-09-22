import { EmailPayload } from '@/interfaces/email';
import { UseCase } from '../ports/use-case';
import nodemailer from 'nodemailer';

export class SendEmail implements UseCase {
  async perform(payload: EmailPayload): Promise<void> {
    await this.sendReminderEmail(payload);
  }

  private async sendReminderEmail(payload: EmailPayload) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PWD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    };

    await transporter.sendMail(mailOptions);
  }
}
