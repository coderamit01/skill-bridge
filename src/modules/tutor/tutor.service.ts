import { User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { TutorProfile, TutorUpdateProfile } from "../../type/tutor";

const getTutors = async () => { };
const createProfile = async (user: User, data: TutorProfile) => {
  const { id, role } = user;
  if (!user) {
    throw new AppError("User not authenticated", 401);
  }
  if (role !== UserRole.TUTOR) {
    throw new AppError("Access denied. Tutor only.", 403);
  }
  const exists = await prisma.tutor.findUnique({
    where: { user_id: id },
  });
  if (exists) {
    throw new AppError("Profile already exists", 400);
  }

  return await prisma.tutor.create({
    data: {
      user_id: id,
      bio: data.bio ?? null,
      hourly_rate: data.hourly_rate ?? null,
      experience_years: data.experience_years ?? null,
      education: data.education ?? null,
      category_id: data.category_id ?? null,
      avg_rating: data.avg_rating ?? null,
      avilable_start_time: data.avilable_start_time,
      avilable_end_time: data.avilable_end_time,
    },
  });
};
const updateProfile = async (user: User,tutorId:string, data: TutorUpdateProfile) => {
  const { id, role } = user;

  if (![UserRole.TUTOR, UserRole.ADMIN].includes(role as UserRole)) {
    throw new AppError("Access denied.", 403);
  }

  const tutor = await prisma.tutor.findUniqueOrThrow({
    where: { id: tutorId },
  });

  if (role === UserRole.TUTOR && tutor.user_id !== id) {
    throw new AppError("Access denied.", 403);
  }

  return await prisma.tutor.update({
    where: { id: tutorId },
    data,
  });
};

export const tutorService = {
  getTutors,
  createProfile,
  updateProfile,
};
