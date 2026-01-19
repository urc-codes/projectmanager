import { getAllLecturers } from './superadmin.service';
import { Router } from "express";
import * as superAdminController from "./superadmin.controller";
import { protect } from "../../middleware/auth.middleware";
import { restrictTo } from "../../middleware/role.middleware";
import { UserRole } from "../auth/auth.types";
import { validate } from "../../middleware/validate.middleware";
import * as schemas from "./superadmin.types";

const router = Router();

router.use(protect);
router.use(restrictTo(UserRole.SUPER_ADMIN));

router.get("/lecturers/pending", superAdminController.getPendingLecturers);

router.get("/lecturers", superAdminController.getAllLecturers);


router.patch(
  "/lecturers/:lecturerId/approve",
  validate(schemas.approveLecturerSchema),
  superAdminController.approveLecturer,
);

router.delete(
  "/lecturers/:lecturerId/reject",
  validate(schemas.approveLecturerSchema),
  superAdminController.rejectLecturer,
);

export default router;
