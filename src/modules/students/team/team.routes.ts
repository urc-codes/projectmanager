import { Router } from "express";
import * as teamController from "./team.controller";
import { protect } from "../../../middleware/auth.middleware";
import { restrictTo } from "../../../middleware/role.middleware";
import { validate } from "../../../middleware/validate.middleware";
import * as schemas from "./team.types";
import { UserRole } from "../../auth/auth.types";

const router = Router();

router.use(protect);
router.use(restrictTo(UserRole.STUDENT));

router.post("/", validate(schemas.createTeamSchema), teamController.createTeam);

router.get("/", teamController.getMyTeam);

router.post(
  "/invite",
  validate(schemas.inviteMemberSchema),
  teamController.inviteMember,
);

router.get("/invites", teamController.getInvites);

router.post(
  "/invites/:inviteId/respond",
  validate(schemas.respondInviteSchema),
  teamController.respondToInvite,
);

router.delete(
  "/members/:userId",
  validate(schemas.removeMemberSchema),
  teamController.removeMember,
);

export default router;
