import { betterAuth, boolean, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  TUTOR = 'tutor'
}
export enum UserStatus {
  BAN = 'ban',
  UNBAN = 'unban'
}
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: ['http://localhost:5000','http://localhost:3000'],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.STUDENT,
        required: true,
      },
      is_banned: {
        type: "boolean",
        defaultValue: false,
        required: false,
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});