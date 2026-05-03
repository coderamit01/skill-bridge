import { prisma } from "../../lib/prisma";
import { ISubjectPayload } from "./subject.interface";

const getAllSubject = async () => {
  return await prisma.tutorSubject.findMany({
    include: {
      category: true,
      tutor: true
    },
  });
};


const createSubject = async (payload: ISubjectPayload) => {
  return await prisma.tutorSubject.create({
    data: payload,
    include: {
      tutor: true,
      category: true
    },
  });
};

const updateSubject = async (id: string, data: ISubjectPayload) => {
  return await prisma.tutorSubject.update({
    where: {
      id,
    },
    data,
    include: {
      category: true,
    },
  });
};

const deleteSubject = async (id: string) => {
  return await prisma.tutorSubject.delete({
    where: {
      id,
    },
  });
};

export const subjectService = {
  getAllSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
