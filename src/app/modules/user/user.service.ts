import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { IRequestUser } from "../../interface/requestUser.interface";
import { auth, UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { IRegisterPayload } from "./user.interface";


const creatTutor = async(payload: IRegisterPayload) => {
    const existUser = await prisma.user.findUnique({
      where: { email: payload.tutor.email }
    });
    if (existUser) {
      throw new AppError("User already exists", 400);
    }
  
    const userData = await auth.api.signUpEmail({
      body: {
        name: payload.tutor.name,
        email: payload.tutor.email,
        password: payload.password,
        role: UserRole.TUTOR,
      }
    });

    try {
      const result = await prisma.$transaction(async(tx) => {
        const tutorData = await tx.tutor.create({
          data: {
            userId: userData.user.id,
            ...payload.tutor
          }
        })
        return tutorData;
      })
      return result;
    } catch (error) {
      await prisma.user.delete({
          where: {id: userData.user.id}
      })
    }

}

const getAllUser = async (user: IRequestUser) => {
  // if (user.role !== UserRole.ADMIN) {
  //   throw new AppError("Access Denied!", 403)
  // }
  return await prisma.user.findMany({});
};
const updateUser = async (id: string, user: IRequestUser, data: User, isAdmin: boolean) => {

  const exists = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  })

  if (!isAdmin && (exists.id !== id)) {
    throw new AppError("Access Denied!", 403)
  }

  if (!isAdmin) {
    delete (data as any).isBanned;
  }

  return await prisma.user.update({
    where: {
      id
    },
    data
  });
};
const updateUserStatus = async (id: string, user: IRequestUser, data: User) => {
  if (UserRole.ADMIN !== user.role) {
    throw new AppError("Access Denied!", 403)
  }

  return await prisma.user.update({
    where: {
      id
    },
    data: {
      isBanned: data.isBanned
    }
  });
};

export const userService = {
  creatTutor,
  getAllUser,
  updateUserStatus,
  updateUser
}