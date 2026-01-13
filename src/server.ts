import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import logger from "./libs/logger";
import { User } from "./modules/auth/auth.model";
import { UserRole } from "./modules/auth/auth.types";

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: UserRole.SUPER_ADMIN });
  if (!adminExists) {
    await User.create({
      email: env.DEFAULT_ADMIN_EMAIL,
      passwordHash: env.DEFAULT_ADMIN_PASSWORD,
      role: UserRole.SUPER_ADMIN,
    });
    logger.info(` Default Super Admin created: ${env.DEFAULT_ADMIN_EMAIL}`);
  }
};

const startServer = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(env.PORT, () => {
    logger.info(` Server running on port ${env.PORT}`);
  });
};

startServer().catch((err) => {
  logger.error("Failed to start server", err);
});
