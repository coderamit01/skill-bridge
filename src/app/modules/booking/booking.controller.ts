import { Request, Response } from "express";
import { AppError } from "../../helpers/appError";
import { bookingService } from "./booking.service";
import { BookingStatus, User } from "../../../generated/prisma/client";
import { Booking } from "../../type/booking";

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const result = await bookingService.getAllBooking(user);
    res.status(200).json({
      success: true,
      message: "Retrive all bookings successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
const getBookingById = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req?.params as { bookingId: string };
    const result = await bookingService.getBookingById(bookingId);
    res.status(200).json({
      success: true,
      message: "Retrive bookings successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
const createBooking = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const payload: Booking = req.body;
    const result = await bookingService.createBooking(user, payload);

    res.status(201).json({
      success: true,
      message: "Booked successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const user = req?.user as User;
    const { bookingId } = req?.params as { bookingId: string };
    const { status } = req.body as { status: BookingStatus };
    const result = await bookingService.updateBookingStatus(
      bookingId,
      user,
      status,
    );
    res.status(200).json({
      success: true,
      message: "Update booking status successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingStatus,
};
