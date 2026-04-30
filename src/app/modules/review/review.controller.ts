import { Request, Response } from "express";
import { AppError } from "../../helpers/appError";
import { reviewService } from "./review.service";
import { User } from "../../../generated/prisma/client";
import { Review } from "../../type/review";

const createReview = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const payload: Review = req.body;
    const result = await reviewService.createReview(user, payload);
    res.status(201).json({
      success: true,
      message: "Review Create successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const reviewController = {
  createReview,
};
