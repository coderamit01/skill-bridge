import { User } from "../../../generated/prisma/client";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { TutorProfile } from "../../type/tutor";

const getTutors = async () => {};
const createProfile = async (user: User, data: TutorProfile) => {
  const { id, role } = user;
  if (!user) {
    throw new Error("User not authenticated");
  }
  if (role !== UserRole.TUTOR) {
    throw new Error("Access denied. Tutor only.");
  }
  const exists = await prisma.tutor.findFirst({
    where: { user_id: id },
  });
  if (exists) {
    throw new Error("Profile already exists");
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
const updateProfile = async (user: User, data: TutorProfile) => {
  const { id, role } = user;
  if (!user) {
    throw new Error("User not authenticated");
  }
  const tutorData = await prisma.tutor.findFirstOrThrow({
    where: { user_id: id },
  });

  if (
    [UserRole.TUTOR, UserRole.ADMIN].includes(role as UserRole) &&
    tutorData.id !== id
  ) {
    throw new Error("Access denied.");
  }

  return await prisma.tutor.update({
    where: {
      user_id: id,
    },
    data,
  });
};

export const tutorService = {
  getTutors,
  createProfile,
  updateProfile,
};
