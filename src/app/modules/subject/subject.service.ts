import { prisma } from "../../lib/prisma";
import { typeSubject } from "../../type/subject";

const getAllSubject = async () => {
  return await prisma.subject.findMany({
    include: {
      category: true,
    },
  });
};

const getSingleSubject = async (id: string) => {
  return await prisma.subject.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

const createSubject = async (data: typeSubject) => {
  return await prisma.subject.create({
    data,
    include: {
      category: true,
    },
  });
};

const updateSubject = async (id: string, data: typeSubject) => {
  return await prisma.subject.update({
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
  return await prisma.subject.delete({
    where: {
      id,
    },
  });
};

export const subjectService = {
  getAllSubject,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
