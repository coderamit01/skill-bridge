import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile } from "../../type/tutor";
import { User } from "../../../generated/prisma/client";

const getTutors = async () => {};

const createProfile = async (req: Request, res: Response) => {
  const user = req?.user as User;
  const payload: TutorProfile = req.body;
  const result = await tutorService.createProfile(user, payload);
  res.status(201).json({
    success: false,
    message: "Profile created succussfully",
    data: result,
  });
};
const updateProfile = async (req: Request, res: Response) => {
  const user = req?.user as User;
  const payload: TutorProfile = req.body;
  const result = await tutorService.updateProfile(user, payload);
  res.status(201).json({
    success: false,
    message: "Profile update succussfully",
    data: result,
  });
};

export const tutorController = {
  getTutors,
  createProfile,
  updateProfile,
};
