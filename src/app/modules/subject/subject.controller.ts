import { Request, Response } from "express";
import { subjectService } from "./subject.service";
import { ISubjectPayload } from "./subject.interface";
import { AppError } from "../../helpers/appError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const getAllSubject = async (req: Request, res: Response) => {
  try {
    const result = await subjectService.getAllSubject();
    res.status(200).json({
      success: true,
      message: "Retrieved subjects successfully",
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

const getSingleSubject = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params as { subjectId: string };
    const result = await subjectService.getSingleSubject(subjectId);
    res.status(200).json({
      success: true,
      message: "Retrieved subject successfully",
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


const createSubject = catchAsync(
  async (req: Request, res: Response) => {
    const payload: ISubjectPayload = req.body;
    const result = await subjectService.createSubject(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Subject created successfully",
      data: result,
    });
  }
)

const updateSubject = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params as { subjectId: string };
    const data: typeSubject = req.body;
    const result = await subjectService.updateSubject(subjectId, data);
    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
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

const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params as { subjectId: string };
    await subjectService.deleteSubject(subjectId);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
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

export const subjectController = {
  getAllSubject,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
