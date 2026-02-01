import { error } from "node:console";
import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const getAllUser = async (user:User) => {
  if(UserRole.ADMIN !== user.role){
    throw new AppError("Access Denied!", 403)
  }
  return await prisma.user.findMany({});
};
const updateUser = async (id:string,user:User,data: User,isAdmin:boolean) => {

  const exists = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  })

  if(!isAdmin && (exists.id !== id)){
    throw new AppError("Access Denied!",403)
  }

  if(!isAdmin){
    delete (data as any).is_banned;
    throw new AppError("You have no permission to update User status",401)
  }

  return await prisma.user.update({
    where: {
      id
    },
    data
  });
};
const updateUserStatus = async (id:string,user:User,data: User) => {
  if(UserRole.ADMIN !== user.role){
    throw new AppError("Access Denied!", 403)
  }

  return await prisma.user.update({
    where: {
      id
    },
    data: {
      is_banned: data.is_banned
    }
  });
};

export const userService = {
  getAllUser,updateUserStatus,updateUser,
}