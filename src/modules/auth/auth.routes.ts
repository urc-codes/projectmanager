import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import * as schemas from "./auth.types";

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
