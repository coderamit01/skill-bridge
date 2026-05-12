import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./app/routes";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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
