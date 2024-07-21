import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { APPNAME, HOST, MAIL_PASSWORD, MAIL_USER, NODE_ENV } from "./config";

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: NODE_ENV !== "development",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmailProps = {
  form: Mail.Address;
  to: string[];
  subject: string;
  html?: string;
};

export const sendEmail = async (props: SendEmailProps) => {
  const { form, to, subject, html } = props;

  return await transport.sendMail({
    from: form,
    to: to,
    subject: subject,
    html: html,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${HOST}/auth/new-verification?token=${token}`;

  await transport.sendMail({
    from: {
      name: APPNAME!,
      address: MAIL_USER!,
    },
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
