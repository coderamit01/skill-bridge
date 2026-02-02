import express from "express";
import { bookingController } from "./booking.controller";
import authentication from "../../middleware/authentication";
import { UserRole } from "../../lib/auth";

const router = express.Router();

router.get(
  "/",
  authentication(UserRole.ADMIN, UserRole.STUDENT),
  bookingController.getAllBooking,
);
router.get("/:bookingId", authentication(), bookingController.getBookingById);
router.post("/", bookingController.createBooking);

export const bookingRouter = router;
