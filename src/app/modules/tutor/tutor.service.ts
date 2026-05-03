import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { IRequestUser, ITutorAvailability, IUpdateTutorAvailability } from "../../interface/requestUser.interface";
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

const updateProfile = async (user: IRequestUser, payload: Partial<TutorUpdateProfile>) => {

  if(user.role !== UserRole.TUTOR) {throw new AppError("Only tutors can update profile", 403)}

  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });

  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }

  return await prisma.tutor.update({
    where: { id: tutor.id },
    data: payload,
  });
};

const createAvailablity = async(user: IRequestUser, payload:ITutorAvailability) => {
  const {startTime, endTime} = payload;

  if(user.role !== UserRole.TUTOR) {throw new AppError("Only tutors can create availability", 403)}

  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });

  if(!tutor) {throw new AppError("Tutor not found", 404)}

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if(start >= end) {throw new AppError("Ensuring the start time is less than the end time", 400)}

  if(start < Date.now()) { throw new AppError("Availability cannot be in the past", 400)}

  const existAvailablity = await prisma.availablity.findFirst({
    where: {
      tutorId: tutor.id,
      startTime: {lte: new Date(endTime)},
      endTime: {gte: new Date(startTime)}
    }
  });

  if(existAvailablity) {throw new AppError("Availability overlaps with an existing slot", 409)}

  const result = await prisma.availablity.create({
    data: {
      tutorId: tutor.id,
      ...payload
    }
  })
  return result;
}

const updateAvialablity = async (user: IRequestUser, availableId: string, payload: Partial<ITutorAvailability>) => {
  const {startTime, endTime} = payload;

  if(user.role !== UserRole.TUTOR) {throw new AppError("Only tutors can update availability", 403)}

  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });

  if(!tutor) {throw new AppError("You are not a registered tutor", 404)}

  const start = new Date(startTime!).getTime();
  const end = new Date(endTime!).getTime();

  if(start >= end) {throw new AppError("Ensuring the start time is less than the end time", 400)}

  if(start < Date.now()) { throw new AppError("Availability cannot be in the past", 400)}

  const existAvailablity = await prisma.availablity.findFirst({
    where: {
      tutorId: tutor.id,
      startTime: {lte: new Date(endTime!)},
      endTime: {gte: new Date(startTime!)}
    }
  });

  if(existAvailablity) {throw new AppError("Availability overlaps with an existing slot", 409)}

  const result = await prisma.availablity.update({
    where: {
      id: availableId
    },
    data: {
      ...payload
    }
  })
  return result;
};

// Tutor only can delete their own availability.
const deleteAvialablity = async (user: IRequestUser, availableId: string) => {

  if(user.role !== UserRole.TUTOR) {
    throw new AppError("Only tutors can delete availability", 403)
  }

  const tutor = await prisma.tutor.findUnique(
    {where: { userId: user.userId } 
  });

  if(!tutor) {
    throw new AppError("You are not a registered tutor", 404)
  }
  const availablity = await prisma.availablity.findUnique({
    where: {
     id: availableId
    }
  })

  if(!availablity) {
    throw new AppError("Availability not found", 404)
  }

  if(availablity.tutorId !== tutor.id) {
    throw new AppError("You are not authorized to delete this availability", 403)
  }

  const result = await prisma.availablity.delete({
    where: {
      id: availableId,
    }
  })
  return result;
}

export const tutorService = {
  getAllTutors,
  updateProfile,
  createAvailablity,
  updateAvialablity,
  getTutorById,
  deleteAvialablity,
};
