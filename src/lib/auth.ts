import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export enum UserRole {
  STUDENT = 'student',
  TUTOR = 'tutor'
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.STUDENT,
        required: true,
      }
    }
  }
});