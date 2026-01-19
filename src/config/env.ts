import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3001"),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  DEFAULT_ADMIN_EMAIL: z.string().email(),
  DEFAULT_ADMIN_PASSWORD: z.string().min(6),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error("Invalid environment variables:", envParsed.error.format());
  process.exit(1);
}

export const env = envParsed.data;
