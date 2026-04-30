import { prisma } from "../lib/prisma";
import { UserRole } from "../lib/auth";
import { AppError } from "../helpers/appError";
import { Role } from "../../generated/prisma/enums";
import { envVars } from "../config/env";

type adminDataType = {
  name: string,
  email: string,
  password: string,
  role: UserRole,
}

export async function seedAdmin() {
  try {
    const adminData: adminDataType = {
      name: "Admin",
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASSWORD,
      role: UserRole.ADMIN
    }
    const existUser = await prisma.user.findFirst({
      where: {
        email: adminData.email,
        role: Role.ADMIN
      }
    });

    if (existUser) { throw new AppError('Admin Already exists', 403) };

    const response = await fetch(`${envVars.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": envVars.APP_URL ?? ""
      },
      credentials: "include",
      body: JSON.stringify(adminData)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new AppError(`Admin seed request failed: ${response.status} ${response.statusText} - ${text}`, response.status || 500);
    }
    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        emailVerified: true
      }
    })
    console.log("Admin created Successfuly");
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("seedAdmin error:", error);
    throw new AppError(`Internal Server Error: ${error instanceof Error ? error.message : String(error)}`, 500);
  }
}

seedAdmin();