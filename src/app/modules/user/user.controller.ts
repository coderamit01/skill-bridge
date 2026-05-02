import { Request, Response } from "express";
import { AppError } from "../../helpers/appError";
import { userService } from "./user.service";
import { User } from "../../../generated/prisma/client";
import { UserRole } from "../../lib/auth";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { IRequestUser } from "../../interface/requestUser.interface";

const createTutor = catchAsync(
  async(req: Request, res: Response) => {
    const payload = req.body;
    const result = await userService.creatTutor(payload);
    console.log(result);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Tutor Profile create succussfully",
      data: result,
    });
  }
)
const getAllUser = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await userService.getAllUser(user as IRequestUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive all Users succussfully",
      data: result,
    });
  }
)
const updateUser = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const user = req.user as IRequestUser;
    const payload: User = req.body;
    const isAdmin = user.role === UserRole.ADMIN;
    const result = await userService.updateUser(userId, user, payload, isAdmin);
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Update User succussfully",
      data: result,
    });
    
  }
)
const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const user = req?.user as IRequestUser;
    const payload: User = req.body;
    const result = await userService.updateUserStatus(userId, user, payload);
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Update User succussfully",
      data: result,
    });
}
)

export const userController = {
  createTutor,
  getAllUser,
  updateUserStatus,
  updateUser,
}