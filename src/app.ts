import express from "express";
import cors from "cors";
import { auth } from "./app/lib/auth";
import { tutorRouter } from "./app/modules/tutor/tutor.router";
import { currentUser } from "./app/modules/user/currentUser";
import { toNodeHandler } from "better-auth/node";
import { categoryRouter } from "./app/modules/category/category.router";
import { userRouter } from "./app/modules/user/user.router";
import { bookingRouter } from "./app/modules/booking/booking.router";
import authentication from "./app/middleware/authentication";
import { reviewRouter } from "./app/modules/review/review.router";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/v1", tutorRouter);
app.use("/api", currentUser);

// category route
app.use("/api/v1/categories", categoryRouter);

app.use("/api/v1", userRouter);

app.use("/api/v1/bookings", authentication(), bookingRouter);

app.use("/api/v1/reviews", reviewRouter);

app.use("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default app;
