import dotenv from "dotenv"
import { AppError } from "../helpers/appError";

dotenv.config();

interface EnvConfig {
  PORT: string,
  APP_URL: string,
  DATABASE_URL: string,
  BETTER_AUTH_SECRET: string,
  BETTER_AUTH_URL: string,
  ADMIN_EMAIL: string,
  ADMIN_PASSWORD: string
}

const loadEnvVariables = ():EnvConfig => {

  const requitedEnvVars = [
    "PORT",
    "APP_URL",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD"
  ];

  requitedEnvVars.forEach((ev) =>{ 
    if(!process.env[ev]){
      throw new AppError(`Environment variable ${ev} is required. But it's missing in env file`,500);
    }
  })

  return {
    PORT: process.env.PORT as string,
    APP_URL: process.env.APP_URL as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string
  }
}

export const envVars = loadEnvVariables();