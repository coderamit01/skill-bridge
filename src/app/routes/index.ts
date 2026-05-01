import { Router } from "express";
import { tutorRoutes } from "../modules/tutor/tutor.router";
import { categoryRoutes } from "../modules/category/category.router";
import { userRoutes } from "../modules/user/user.router";
import { bookingRoutes } from "../modules/booking/booking.router";
import authentication from "../middleware/authentication";
import { reviewRoutes } from "../modules/review/review.router";
import { authRoutes } from "../modules/auth/auth.router";


const router = Router();


router.use("/auth", authRoutes)

router.use("/tutors", tutorRoutes);

router.use("/categories", categoryRoutes);

router.use("/users", userRoutes);

router.use("/bookings", authentication(), bookingRoutes);

router.use("/reviews", reviewRoutes);





export const IndexRoutes = router;