import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import * as submissionController from "./submission.controller";
import { protect } from "../../../middleware/auth.middleware";
import { restrictTo } from "../../../middleware/role.middleware";
import { validate } from "../../../middleware/validate.middleware";
import * as schemas from "./submission.types";
import { UserRole } from "../../auth/auth.types";
import { env } from "../../../config/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "submissions",
      resource_type: "auto", 
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: `submission-${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

const router = Router();

router.use(protect);
router.use(restrictTo(UserRole.STUDENT));

router.get("/lecturers", submissionController.getLecturersForDropdown);

router.post(
  "/",
  upload.single("document"),
  validate(schemas.createSubmissionSchema),
  submissionController.createSubmission,
);

router.get("/", submissionController.getMySubmissions);

export default router;
