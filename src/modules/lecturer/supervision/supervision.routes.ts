import { Router } from "express";
import * as supervisionController from "./supervision.controller";
import { protect } from "../../../middleware/auth.middleware";
import { restrictTo } from "../../../middleware/role.middleware";
import { validate } from "../../../middleware/validate.middleware";
import * as schemas from "./supervision.types";
import { UserRole } from "../../auth/auth.types";

const router = Router();

router.use(protect);
router.use(restrictTo(UserRole.LECTURER));

router.get("/requests", supervisionController.getPendingRequests);

router.patch(
  "/requests/:submissionId",
  validate(schemas.updateProposalStatusSchema),
  supervisionController.respondToProposal,
);

router.get("/active", supervisionController.getActiveProjects);

export default router;
