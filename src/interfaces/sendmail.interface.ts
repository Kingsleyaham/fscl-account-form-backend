import Mail from "nodemailer/lib/mailer";

export interface ISendMail {
  from?: string | Mail.Address;
  to?: string | Mail.Address | Array<string> | (string | Mail.Address)[];
  cc?: string | Array<string>;
  bcc?: string | Array<string>;
  subject?: string;
  text?: string;
  html?: string;
  template?: string;
  context?: object;
  attachments?: Mail.Attachment[];
}
