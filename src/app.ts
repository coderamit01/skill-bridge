import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./app/routes";
import { envVars } from "./app/config/env";
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://frontend-skill-bridge.onrender.com"
].filter(Boolean)
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())

app.all("/api/auth", toNodeHandler(auth));


app.use("/api/v1", IndexRoutes)

app.use("/", (req, res) => {
  res.json({ message: "SkillBridge API is running!" });
});

export default app;
