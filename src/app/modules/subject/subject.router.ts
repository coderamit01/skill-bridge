import express from "express";
import { subjectController } from "./subject.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.post("/", authentication(UserRole.ADMIN), subjectController.createSubject);
router.get("/", subjectController.getAllSubject);
router.get("/:subjectId", subjectController.getSingleSubject);
router.put(
  "/:subjectId",
  authentication(UserRole.ADMIN),
  subjectController.updateSubject
);
router.delete(
  "/:subjectId",
  authentication(UserRole.ADMIN),
  subjectController.deleteSubject
);

export const subjectRouter = router;
