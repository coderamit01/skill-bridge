import { email, includes, json } from "better-auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../lib/auth";


async function seedAdmin() {
  try {
    console.log("admin data");
    const adminData = {
      name: "Admin 1",
      email: "admin1@gmail.com",
      password: "12345678",
      role: UserRole.ADMIN
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email: adminData.email
      }
    });
    if (existUser) { throw new Error('User Already exists') };

    await fetch('http://localhost:5000/api/auth/sign-up/email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(adminData),
    });
    console.log('Successfully created the admin');
  } catch (error) {
    console.log("Something went wrong");
  }
}



seedAdmin();