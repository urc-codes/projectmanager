import nodemailer from "nodemailer";
import { env } from "../config/env";
import logger from "./logger";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: env.SMTP_PORT === "465", 
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: `Department Portal <${env.SMTP_FROM}>`,
      to,
      subject,
      text, 
    });

    logger.info(`Email sent: ${info.messageId} to ${to}`);
    return true;
  } catch (error) {
    logger.error("Email failed to send:", error);
    return false;
  }
};
