import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorProfile, TutorUpdateProfile } from "../../type/tutor";
import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { success } from "better-auth";

const getAllTutors = async (req: Request, res: Response) => {
   try {
    const result = await tutorService.getAllTutors();
    res.status(200).json({
      success: false,
      message: "Retrive all Tutors succussfully",
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
const getTutorById = async (req: Request, res: Response) => {
   try {
    const {tutorId} = req.params as {tutorId: string}
    const result = await tutorService.getTutorById(tutorId);
    res.status(200).json({
      success: false,
      message: "Retrive succussfully",
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
    const result = await tutorService.updateProfile(user, payload);
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
const updateAvialablity = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const payload: TutorUpdateProfile = req.body;
    const result = await tutorService.updateProfile(user, payload);
    res.status(200).json({
      success: false,
      message: "Update availablity succussfully",
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
  getAllTutors,
  createProfile,
  updateProfile,
  updateAvialablity,
  getTutorById,
};
