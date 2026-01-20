import { getAllLecturers } from "./superadmin.service";
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
router.get("/students", superAdminController.getAllStudents);

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

router.get("/students/approved", superAdminController.getApprovedStudents);

router.get(
  "/submissions/rejected",
  superAdminController.getRejectedSubmissions,
);

router.patch(
  "/submissions/:submissionId/reassign",
  validate(schemas.reassignSupervisorSchema),
  superAdminController.reassignSupervisor,
);

router.get("/system/window", superAdminController.getWindowStatus);

router.post(
  "/system/window",
  validate(schemas.toggleWindowSchema),
  superAdminController.toggleWindow,
);
export default router;
