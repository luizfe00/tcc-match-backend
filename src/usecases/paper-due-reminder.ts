import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { PaperRepository } from './ports/paper-repository';
import { addDays, isWithinInterval } from 'date-fns';
import { Paper } from '@/models/paper';

export class PaperDueReminder {
  constructor(private readonly paperRepository: PaperRepository) {}

  scheduleJob() {
    cron.schedule('0 7 * * *', async () => {
      this.sendReminders();
    });
  }

  async sendReminders() {
    const papers = await this.paperRepository.findAll();
    const now = new Date();
    const sevenDaysFromNow = addDays(now, 7);

    const duePapers = papers.filter((paper) => {
      const dueDate = addDays(paper.theme.startDate, paper.theme.duration);
      return isWithinInterval(dueDate, { start: now, end: sevenDaysFromNow });
    });

    for (const paper of duePapers) {
      await this.sendReminderEmail(paper);
    }
  }

  private async sendReminderEmail(paper: Paper) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'felipefipa@gmail.com',
        pass: 'hzke icah tnru ldnm',
      },
    });

    const dueDate = new Date(paper.theme.startDate);
    dueDate.setDate(dueDate.getDate() + paper.theme.duration);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'felipefipa@gmail.com',
      subject: 'Prazo para envio do TCC',
      text: `O prazo para envio do TCC para a banca do tema ${paper.theme.label} está chegando. Por favor, envie o seu trabalho o mais breve possível.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${paper.advisor.email}`);
    } catch (error) {
      console.error(`Error sending email to ${paper.advisor.email}: ${error}`);
    }
  }
}
