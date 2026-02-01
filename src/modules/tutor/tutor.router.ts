import express from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get("/tutors", tutorController.getTutors);

router.post(
  "/tutor/profile",
  authentication(UserRole.TUTOR),
  tutorController.createProfile,
);
router.put(
  "/tutor/profile",
  authentication(UserRole.TUTOR, UserRole.ADMIN),
  tutorController.updateProfile,
);

export const tutorRouter = router;
