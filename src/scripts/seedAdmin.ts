import { email, includes, json } from "better-auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../lib/auth";

type adminDataType = {
  name: string,
  email: string,
  password: string,
  role: UserRole,
}

async function seedAdmin() {
  try {
    const adminData:adminDataType = {
      name: "Admin 1",
      email: "admin1@gmail.com",
      password: "admin1234",
      role: UserRole.ADMIN
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email: adminData.email
      }
    });
    if (existUser) { throw new Error('User Already exists') };

    await fetch(`${process.env.APP_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": `${process.env.APP_URL}`
      },
      credentials: "include",
      body: JSON.stringify(adminData)
    });
    console.log("Admin create Successfully");
  } catch (error) {
    console.log("Something went wrong");
  }
}


seedAdmin();