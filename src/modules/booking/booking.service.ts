import { BookingStatus, User } from "../../../generated/prisma/client";
import { AppError } from "../../helpers/appError";
import { UserRole } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { Booking } from "../../type/booking";

const getAllBooking = async (user: User) => {
  if (user.role === UserRole.STUDENT) {
    return await prisma.booking.findMany({
      where: {
        user_id: user.id,
      },
    });
  }
  if (user.role === UserRole.ADMIN) {
    return await prisma.booking.findMany({});
  }
};
const getBookingById = async (id: string) => {
  return await prisma.booking.findUnique({
    where: {
      id,
    },
  });
};
const createBooking = async (user: User, data: Booking) => {
  if (!user) {
    throw new AppError("Login required.", 401);
  }
  if (user.role !== UserRole.STUDENT) {
    throw new AppError("Only students can book", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: {
      id: data.tutor_id,
    },
    select: {
      hourly_rate: true,
      avilable_start_time: true,
      avilable_end_time: true,
    },
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }

  const start = new Date(data.start_time);
  const end = new Date(data.end_time);
  const sessionDate = new Date(data.session_date);

  const startHours = start.getHours();
  const endHours = end.getHours();

  if (
    startHours < new Date(tutor.avilable_start_time).getHours() ||
    endHours > new Date(tutor.avilable_end_time).getHours()
  ) {
    throw new AppError("Outside tutor working hours", 400);
  }
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const price = tutor.hourly_rate?.toNumber()! * durationHours;

  const checkavialable = await prisma.booking.findFirst({
    where: {
      tutor_id: data.tutor_id,
      session_date: sessionDate,
      status: { not: BookingStatus.CANCELLED },
      AND: [{ start_time: { lt: end } }, { end_time: { gt: start } }],
    },
  });
  if (checkavialable) {
    throw new AppError("This time slot is already booked", 400);
  }

  return await prisma.booking.create({
    data: {
      user_id: user.id,
      tutor_id: data.tutor_id,
      session_date: sessionDate,
      start_time: start,
      end_time: end,
      price,
      status: BookingStatus.CONFIRMED,
    },
  });
};
const updateBookingStatus = async (
  bookId: string,
  user: User,
  status: BookingStatus,
) => {
  const bookingData = await prisma.booking.findUnique({
    where: { id: bookId },
  });
  if (!bookingData) throw new AppError("Booking not found", 404);

  if (user.role === UserRole.STUDENT) {
    if (bookingData?.user_id !== user.id) {
      throw new AppError("Not your booking", 403);
    }

    if (status !== BookingStatus.CANCELLED) {
      throw new AppError("Students can only cancel bookings", 403);
    }
  }
  if (user.role === UserRole.ADMIN) {
    if (bookingData?.user_id !== user.id) {
      throw new AppError("Not your booking", 403);
    }

    if (status !== BookingStatus.CANCELLED) {
      throw new AppError("Students can only cancel bookings", 403);
    }
  }

  await prisma.booking.update({
    where: { id: bookId },
    data: { status: status },
  });
};
export const bookingService = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingStatus,
};
