import { Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { TutorUpdateProfile } from "../../type/tutor";
import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ITutorAvailability } from "../../interface/requestUser.interface";

const getAllTutors = catchAsync(
  async (req: Request, res: Response) => {
    const result = await tutorService.getAllTutors();
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Retrive all Tutors succussfully",
      data: result,
    });
  }
)

const getTutorById = catchAsync(
  async (req: Request, res: Response) => {
    const { tutorId } = req.params as { tutorId: string };
    const result = await tutorService.getTutorById(tutorId);
    sendResponse(res,{
      statusCode: 200,
      success: false,
      message: "Retrive Tutor successfully",
      data: result,
    });
  
}
)


const updateProfile = catchAsync(
  async (req: Request, res: Response) => {
    // const user = req.user as User;
    const { tutorId } = req.params as { tutorId: string };
    const payload: TutorUpdateProfile = req.body;
    const result = await tutorService.updateProfile(tutorId, payload);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Profile update succussfully",
      data: result,
    });

})

const createAvailablity = catchAsync(
  async (req: Request, res: Response) => {
    // const {tutorId} = req.params as {tutorId: string};
    const {id} = req.params as {id: string};
    const payload: ITutorAvailability = req.body;
    const result = await tutorService.createAvailablity(id,payload);
    sendResponse(res, {
      statusCode: 201,
      success: false,
      message: "Availablity create succussfully",
      data: result,
    });
})

const updateAvialablity = catchAsync(
  async (req: Request, res: Response) => {
    // const user = req?.user as User;
    const {id} = req.params as {id: string}
    const payload: TutorUpdateProfile = req.body;
    const result = await tutorService.updateProfile(id, payload);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Update availablity succussfully",
      data: result,
    });
  }
)

export const tutorController = {
  getAllTutors,
  updateProfile,
  createAvailablity,
  updateAvialablity,
  getTutorById,
};
