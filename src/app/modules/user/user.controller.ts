import { Request, Response } from "express";
import { AppError } from "../../helpers/appError";
import { userService } from "./user.service";
import { User } from "../../../generated/prisma/client";
import { UserRole } from "../../lib/auth";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { IRequestUser } from "../../interface/requestUser.interface";


const getAllUser = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await userService.getAllUser(user as IRequestUser);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Retrive all Users succussfully",
      data: result,
    });
  }
)
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const user = req?.user as User;
    const payload: User = req.body;
    const isAdmin = user.role === UserRole.ADMIN;
    const result = await userService.updateUser(userId, user, payload, isAdmin);
    res.status(200).json({
      success: false,
      message: "Update User succussfully",
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
const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const user = req?.user as User;
    const payload: User = req.body;
    const result = await userService.updateUserStatus(userId, user, payload);
    res.status(200).json({
      success: false,
      message: "Update User succussfully",
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

export const userController = {
  getAllUser,
  updateUserStatus,
  updateUser,
}