import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  DEFAULT_ADMIN_EMAIL: z.string().email(),
  DEFAULT_ADMIN_PASSWORD: z.string().min(6),

  SMTP_HOST: z.string().describe("Mail server host (e.g., smtp.gmail.com)"),
  SMTP_PORT: z.string().default("587"),
  SMTP_USER: z.string().describe("Email address for sending"),
  SMTP_PASS: z.string().describe("Email password or App Password"),
  SMTP_FROM: z.string().email().default("noreply@university.com"),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("❌ Invalid environment variables:", envParsed.error.format());
  process.exit(1);
}

export const env = envParsed.data;
