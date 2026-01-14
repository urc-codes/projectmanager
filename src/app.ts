import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import { AppError } from "./libs/appError";
import teamRoutes from "./modules/team/team.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Authentication Backend is running successfully",
  });
});

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
