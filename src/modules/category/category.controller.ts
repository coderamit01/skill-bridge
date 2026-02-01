import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { typeCategory } from "../../type/category";
import { AppError } from "../../helpers/appError";

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      message: "Retrive categories successfully",
      data: result
    })
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

}
const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params as { categoryId: string };
    const result = await categoryService.getSingleCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Retrive category successfully",
      data: result
    })
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
}

const createCategory = async (req: Request, res: Response) => {
  try {
    const payload: typeCategory = req.body;
    const result = await categoryService.createCategory(payload);
    res.status(201).json({
      success: true,
      message: "Category created Successfully",
      data: result
    })
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
}

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params as { categoryId: string };
    const payload = req.body
    const result = await categoryService.updateCategory(categoryId, payload);
    res.status(200).json({
      success: true,
      message: "Update category successfully",
      data: result
    })
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
}
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params as { categoryId: string };
    const result = await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Delete category successfully",
    })
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
}

export const categoryController = {
  createCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory,
}