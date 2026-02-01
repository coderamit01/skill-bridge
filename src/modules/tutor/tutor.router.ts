import express from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get("/tutors", tutorController.getAllTutors);
router.get("/tutors/:tutorId", tutorController.getTutorById);

router.post(
  "/tutor/profile",
  authentication(UserRole.TUTOR),
  tutorController.createProfile,
);
router.put(
  "/tutor/profile",
  authentication(UserRole.TUTOR),
  tutorController.updateProfile,
);

router.put(
  "/tutor/availability",
  authentication(UserRole.TUTOR),
  tutorController.updateAvialablity,
);

export const tutorRouter = router;
