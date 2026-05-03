import express from "express";
import { tutorController } from "./tutor.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get("/", tutorController.getAllTutors);
router.get("/:tutorId", tutorController.getTutorById);

router.post("/availability", tutorController.createAvailablity)

router.put("/profile/:tutorId", tutorController.updateProfile);

router.put("/availability", tutorController.updateAvialablity);

export const tutorRoutes = router;
