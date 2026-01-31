import { Request, NextFunction, Response } from "express";
import { auth, UserRole } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";


const authentication = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      })

      if(!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        })
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      }

      if(roles.length && !roles.includes(req.user?.role as UserRole)){
        res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        })
      }

      next();
    } catch (err: any) {
      console.log("Something went wrong", err.message);
    }
  }
}


export default authentication;