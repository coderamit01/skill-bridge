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
      id: data.bookingId,
    },
    select: {
      userId: true,
      status: true,
      tutorId: true,
    },
  });
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }
  if (booking.userId !== user.id) {
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
      bookingId: data.bookingId,
    },
  });
  if (alreadyReview) {
    throw new AppError("Review already submitted", 400);
  }

  const review = await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      userId: user.id,
      tutorId: booking.tutorId,
      rating: data.rating,
      comment: data.comment,
    },
  });

  const stats = await prisma.review.aggregate({
    where: { tutorId: booking.tutorId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.tutor.update({
    where: { id: booking.tutorId },
    data: {
      avg_rating: stats._avg.rating ?? 0,
    },
  });

  return review;
};

export const reviewService = {
  createReview,
};
