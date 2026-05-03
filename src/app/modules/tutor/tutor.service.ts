import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { ITutorAvailability, IUpdateTutorAvailability } from "../../interface/requestUser.interface";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { TutorProfile, TutorUpdateProfile } from "../../type/tutor";

const getAllTutors = async () => {
  return await prisma.tutor.findMany({
    include: {
      user: true,
      subjects: {
        select: {category: true}
      },
      bookings: true,
      reviews: true,
      availablity: true
    }
  });
};


const getTutorById = async (id: string) => {
  return await prisma.tutor.findUnique({
    where: {
      id
    },
    include: {
     user: true,
     subjects: {
        select: {category: true}
      },
      bookings: true,
      reviews: true,
      availablity: true
    }
  });
};


const updateProfile = async (id: string, data: TutorUpdateProfile) => {

  const tutor = await prisma.tutor.findUniqueOrThrow({
    where: { userId: id }
  });

  // if (role === UserRole.TUTOR && tutor.userId !== id) {
  //   throw new AppError("Access denied.", 403);
  // }

  return await prisma.tutor.update({
    where: { userId: id },
    data,
  });
};

const createAvailablity = async(id: string, payload:ITutorAvailability) => {
  const {startTime, endTime} = payload;

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if(start >= end) {throw new AppError("Ensuring the start time is less than the end time", 400)}

  if(start < Date.now()) { throw new AppError("Availability cannot be in the past", 400)}

  const existAvailablity = await prisma.availablity.findFirst({
    where: {
      id,
      startTime: {lt: new Date(endTime)},
      endTime: {gt: new Date(startTime)}
    }
  });

  if(existAvailablity) {throw new AppError("Availability overlaps with an existing slot", 409)}

  const result = await prisma.availablity.create({
    data: payload
  })
  return result;
}

const updateAvialablity = async (id: string, payload: IUpdateTutorAvailability) => {

  // const tutor = await prisma.tutor.findUniqueOrThrow({
  //   where: { userId: id },
  // });

  // if (role === UserRole.TUTOR && tutor.userId !== id) {
  //   throw new AppError("Access denied.", 403);
  // }

  return await prisma.availablity.update({
    where: { tutorId: id },
    data: payload
  });
};

export const tutorService = {
  getAllTutors,
  updateProfile,
  createAvailablity,
  updateAvialablity,
  getTutorById,
};
