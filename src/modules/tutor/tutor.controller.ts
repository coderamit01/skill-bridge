import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile, TutorUpdateProfile } from "../../type/tutor";
import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { success } from "better-auth";

const getTutors = async () => { };

const createProfile = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const payload: TutorProfile = req.body;
    const result = await tutorService.createProfile(user, payload);
    res.status(201).json({
      success: false,
      message: "Profile created succussfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      })
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const {tutorId} = req?.params as {tutorId: string}
    const payload: TutorUpdateProfile = req.body;
    const result = await tutorService.updateProfile(user,tutorId, payload);
    res.status(200).json({
      success: false,
      message: "Profile update succussfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      })
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const tutorController = {
  getTutors,
  createProfile,
  updateProfile,
};
