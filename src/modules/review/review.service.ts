import { BookingStatus, User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { Review } from "../../type/review";

const createReview = async (user: User, data: Review) => {
  if (user.role !== UserRole.STUDENT) {
    throw new AppError("Only students can review", 403);
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: data.booking_id,
    },
    select: {
      user_id: true,
      status: true,
      tutor_id: true,
    },
  });
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }
  if (booking.user_id !== user.id) {
    throw new AppError("You cannot review this session", 403);
  }
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new AppError(
      "You can review only after the session is completed",
      403,
    );
  }
  const alreadyReview = await prisma.review.findFirst({
    where: {
      booking_id: data.booking_id,
    },
  });
  if (alreadyReview) {
    throw new AppError("Review already submitted", 400);
  }

  const review = await prisma.review.create({
    data: {
      booking_id: data.booking_id,
      user_id: user.id,
      tutor_id: booking.tutor_id,
      rating: data.rating,
      comment: data.comment,
    },
  });

  const stats = await prisma.review.aggregate({
    where: { tutor_id: booking.tutor_id },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.tutor.update({
    where: { id: booking.tutor_id },
    data: {
      avg_rating: stats._avg.rating ?? 0,
    },
  });

  return review;
};

export const reviewService = {
  createReview,
};
