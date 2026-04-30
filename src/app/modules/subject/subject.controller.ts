import { Request, Response } from "express";
import { subjectService } from "./subject.service";
import { typeSubject } from "../../type/subject";
import { AppError } from "../../helpers/appError";

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


const createSubject = async (req: Request, res: Response) => {
  try {
    const data: typeSubject = req.body;
    const result = await subjectService.createSubject(data);
    res.status(201).json({
      success: true,
      message: "Subject created successfully",
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
