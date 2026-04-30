import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR"
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL as string],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.STUDENT,
        required: true,
        input: true
      },
      isBanned: {
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

type Session = typeof auth.$Infer.Session;