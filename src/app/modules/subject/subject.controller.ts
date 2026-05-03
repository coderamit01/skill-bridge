import { Request, Response } from "express";
import { subjectService } from "./subject.service";
import { ISubjectPayload } from "./subject.interface";
import { AppError } from "../../helpers/appError";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const getAllSubject = catchAsync(
  async (req: Request, res: Response) => {
    const result = await subjectService.getAllSubject();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrieved subjects successfully",
      data: result,
    });
}
)


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

const updateSubject = catchAsync(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params as { subjectId: string };
    const payload: ISubjectPayload = req.body;
    const result = await subjectService.updateSubject(subjectId, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Subject updated successfully",
      data: result,
    });
})

const deleteSubject = catchAsync(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params as { subjectId: string };
    await subjectService.deleteSubject(subjectId);
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Subject deleted successfully",
    });
}
)

export const subjectController = {
  getAllSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
