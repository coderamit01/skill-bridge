import { prisma } from "../../lib/prisma";
import { typeCategory } from "../../type/category";

const getAllCategory = async() => {
  return await prisma.category.findMany();  
}
const getSingleCategory = async(id:string) => {
  return await prisma.category.findUnique({
    where: {
      id
    }
  });  
}

const createCategory = async(data:typeCategory) => {
  return await prisma.category.create({
    data
  });  
}

const updateCategory = async(id:string,data:typeCategory) => {
  return await prisma.category.update({
    where: {
      id:id
    },
    data
  });  
}
const deleteCategory = async(id:string) => {
  return await prisma.category.delete({
    where: {
      id
    }
  });  
}

export const categoryService = {
  createCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory,
}