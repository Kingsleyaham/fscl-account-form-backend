import nodemailer from "nodemailer";
import { ICreateTransport } from "../interfaces/mailTransport.interface";
import { ISendMail } from "../interfaces/sendmail.interface";
import { mailConfig } from "../config";

class MailService {
  async createTransport(transObj: ICreateTransport) {
    return nodemailer.createTransport({
      ...transObj,
    });
  }

  async sendMail(mailObj: ISendMail) {
    const { auth, host, port, secure } = mailConfig;
    
    const transporter = await this.createTransport({ host, port, secure, auth });

    const { from, to, subject, attachments, html, text } = mailObj;

    const info = await transporter.sendMail({ from, to, subject, html, text, attachments });

    console.log(info);
  }
}

export const mailService = new MailService();
