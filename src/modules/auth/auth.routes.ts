import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import * as schemas from "./auth.types";
import { UserRole } from "./auth.types";
import { protect } from "../../middleware/auth.middleware";
import { restrictTo } from "../../middleware/role.middleware";



const router = Router();

router.post(
  "/student/signup",
  validate(schemas.studentSignupSchema),
  authController.studentSignup
);
router.post(
  "/student/signin",
  validate(schemas.studentSigninSchema),
  authController.studentSignin
);

router.get(
  "/student/profile",
  protect,
  restrictTo(UserRole.STUDENT),
  authController.getStudentProfile
);

router.post(
  "/lecturer/signup",
  validate(schemas.lecturerSignupSchema),
  authController.lecturerSignup
);
router.post(
  "/lecturer/signin",
  validate(schemas.lecturerSigninSchema),
  authController.lecturerSignin
);

router.post(
  "/superadmin/signin",
  validate(schemas.adminSigninSchema),
  authController.superAdminSignin
);

export default router;
