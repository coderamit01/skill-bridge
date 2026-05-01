import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { authService } from "./auth.service";
import { tokenUtils } from "../../utils/token";
import { IRequestUser } from "../../interface/requestUser.interface";


const createUser = catchAsync(
  async (req: Request, res: Response) => {

    const payload = req.body;
    const result = await authService.createUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCooke(res, token as string);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Register successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    })
  }
)

const loginUser = catchAsync(
  async (req: Request, res: Response) => {

    const payload = req.body;
    const result = await authService.loginUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;

    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCooke(res, token as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    })
  }
)

const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    console.log({ user });
    const result = await authService.getMe(user as IRequestUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile fetched successfully",
      data: result
    })
  }
)
const logOut = catchAsync(
  async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"]
    const result = await authService.logOut(betterAuthSessionToken);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logout successfully",
      data: result
    })
  }
)


export const authController = {
  loginUser,
  createUser,
  getMe,
  logOut
}