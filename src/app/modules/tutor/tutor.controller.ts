import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorUpdateProfile } from "../../type/tutor";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { IRequestUser, ITutorAvailability } from "../../interface/requestUser.interface";

const getAllTutors = catchAsync(
  async (req: Request, res: Response) => {
    const result = await tutorService.getAllTutors();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive all Tutors succussfully",
      data: result,
    });
  }
)

const getTutorById = catchAsync(
  async (req: Request, res: Response) => {
    const { tutorId } = req.params as { tutorId: string };
    const result = await tutorService.getTutorById(tutorId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive Tutor successfully",
      data: result,
    });

  }
)

const getAllAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const user = req?.user as IRequestUser;
    const result = await tutorService.getAllAvailability(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive Tutors Availability succussfully",
      data: result,
    });
  }
)



const updateProfile = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as IRequestUser;
    const payload: TutorUpdateProfile = req.body;
    const result = await tutorService.updateProfile(user, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile update succussfully",
      data: result,
    });

  })

const createAvailablity = catchAsync(
  async (req: Request, res: Response) => {
    const user = req?.user as IRequestUser;
    const payload: ITutorAvailability = req.body;
    const result = await tutorService.createAvailablity(user, payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Availablity create succussfully",
      data: result,
    });
  })

const updateAvialablity = catchAsync(
  async (req: Request, res: Response) => {
    const user = req?.user as IRequestUser;
    const { availableId } = req.params as { availableId: string };
    const payload: ITutorAvailability = req.body;
    const result = await tutorService.updateAvialablity(user, availableId, payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Availablity updated succussfully",
      data: result,
    });
  }
)

const deleteAvialablity = catchAsync(
  async (req: Request, res: Response) => {
    const user = req?.user as IRequestUser;
    const { availableId } = req.params as { availableId: string };
    const result = await tutorService.deleteAvialablity(user, availableId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Availablity deleted succussfully",
      data: result,
    });
  }
)

export const tutorController = {
  getAllTutors,
  updateProfile,
  getAllAvailability,
  createAvailablity,
  updateAvialablity,
  getTutorById,
  deleteAvialablity,
};
