import express from "express";
import { bookingController } from "./booking.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get(  "/",  authentication(UserRole.ADMIN, UserRole.STUDENT),  bookingController.getAllBooking);

router.get("/:bookingId", authentication(UserRole.ADMIN,UserRole.STUDENT), bookingController.getBookingById);

router.post("/", authentication(UserRole.STUDENT), bookingController.createBooking);

router.put("/:bookingId", authentication(UserRole.ADMIN, UserRole.TUTOR, UserRole.STUDENT), bookingController.updateBookingStatus);

export const bookingRoutes = router;
