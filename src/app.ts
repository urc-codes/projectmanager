import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import { AppError } from "./libs/appError";
import teamRoutes from "./modules/students/team/team.routes";
import superAdminRoutes from "./modules/superadmin/superadmin.routes";
import submissionRoutes from "./modules/students/submission/submission.routes";
import supervisionRoutes from "./modules/lecturer/supervision/supervision.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend is running successfully",
  });
});

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/superadmin", superAdminRoutes);
app.use("/submissions", submissionRoutes);
app.use("/lecturer", supervisionRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
