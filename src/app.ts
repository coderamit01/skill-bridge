import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./app/routes";
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://skill-bridge-frontend-two-flame.vercel.app/",
]
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser())

app.all("/api/auth/", toNodeHandler(auth));


app.use("/api/v1", IndexRoutes)

app.use("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default app;
