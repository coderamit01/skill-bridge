import express from "express";
import { tutorController } from "./tutor.controller";

const router = express.Router();

router.get('/tutors', tutorController.getTutors)


export const tutorRouter = router;