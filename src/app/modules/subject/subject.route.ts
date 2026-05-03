import express from "express";
import { subjectController } from "./subject.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.post("/",  subjectController.createSubject);
router.get("/", subjectController.getAllSubject);
router.put(
  "/:subjectId",
  subjectController.updateSubject
);
router.delete(
  "/:subjectId",
  subjectController.deleteSubject
);

export const tutorSubjectRoutes = router;
