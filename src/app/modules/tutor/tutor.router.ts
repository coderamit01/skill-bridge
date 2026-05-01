import express from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get("/", tutorController.getAllTutors);
router.get("/:tutorId", tutorController.getTutorById);

router.post(
  "/profile",
  authentication(UserRole.TUTOR),
  tutorController.createProfile,
);
router.put(
  "/profile",
  authentication(UserRole.TUTOR),
  tutorController.updateProfile,
);

router.put(
  "/availability",
  authentication(UserRole.TUTOR),
  tutorController.updateAvialablity,
);

export const tutorRoutes = router;
