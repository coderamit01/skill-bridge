import { Request, NextFunction, Response } from "express";
import { auth, UserRole } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { AppError } from "../helpers/appError";


const authentication = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      })

      if (!session || !session.user) {
        throw new AppError("Authentication failed. Please log in to access this resource.",401)
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }

      if (roles.length && !roles.includes(req.user?.role as UserRole)) {
        throw new AppError("Forbidden: You do not have the necessary permissions to access this resource.",403)
      }

      next();
    } catch (error: any) {
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
  }
}


export default authentication;