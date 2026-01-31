import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { typeCategory } from "../../type/category";

const getAllCategory = async(req:Request,res:Response) => {
  const result = await categoryService.getAllCategory();
  res.status(200).json({
    success: true,
    message: "Retrive categories successfully",
    data: result
  })
}
const getSingleCategory = async(req:Request,res:Response) => {
 const {categoryId} = req.params as {categoryId: string};
  const result = await categoryService.getSingleCategory(categoryId);
  res.status(200).json({
    success: true,
    message: "Retrive category successfully",
    data: result
  })
}

const createCategory = async(req:Request,res:Response) => {
  const payload:typeCategory = req.body;
  const result = await categoryService.createCategory(payload);
  res.status(201).json({
    success: true,
    message: "Category created Successfully",
    data: result
  })
}

const updateCategory = async(req:Request,res:Response) => {
  const {categoryId} = req.params as {categoryId: string};
  const payload = req.body
  const result = await categoryService.updateCategory(categoryId,payload);
  res.status(200).json({
    success: true,
    message: "Update category successfully",
    data: result
  })
}
const deleteCategory = async(req:Request,res:Response) => {
  const {categoryId} = req.params as {categoryId: string};
  const result = await categoryService.deleteCategory(categoryId);
  res.status(200).json({
    success: true,
    message: "Delete category successfully",
  })
}

export const categoryController = {
  createCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory,
}