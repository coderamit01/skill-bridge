// src/app.ts
import express8 from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// src/app/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// src/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Availablity {\n  id        String   @id @default(uuid())\n  tutorId   String\n  startTime DateTime\n  endTime   DateTime\n  isBooked  Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tutor     Tutor    @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  bookingId Booking?\n\n  @@map("availabilities")\n}\n\nmodel Booking {\n  id             String        @id @default(uuid())\n  studentId      String\n  tutorId        String\n  availabilityId String        @unique\n  scheduleAt     DateTime\n  status         BookingStatus @default(CONFIRMED)\n  totalPrice     Decimal       @db.Decimal(10, 2)\n  createdAt      DateTime      @default(now())\n  updatedAt      DateTime      @updatedAt\n\n  tutor        Tutor       @relation("TutorBookings", fields: [tutorId], references: [id])\n  student      User        @relation("StudentBookings", fields: [studentId], references: [id])\n  availability Availablity @relation(fields: [availabilityId], references: [id])\n  review       Review?\n\n  @@map("bookings")\n}\n\nmodel Category {\n  id      String  @id @default(uuid())\n  name    String  @unique\n  slug    String  @unique\n  iconUrl String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  subjects TutorSubject[]\n\n  @@map("categories")\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  bookingId String   @unique\n  studentId String\n  tutorId   String\n  comment   String?  @db.Text\n  rating    Decimal? @default(0) @db.Decimal(3, 2)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  booking Booking @relation(fields: [bookingId], references: [id])\n  student User    @relation("StudentReviews", fields: [studentId], references: [id])\n\n  tutor Tutor @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../src/generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  STUDENT\n  TUTOR\n  ADMIN\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum BookingStatus {\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel Tutor {\n  id              String   @id @default(uuid())\n  name            String\n  email           String   @unique\n  image           String?\n  contactNumber   String?\n  gender          Gender\n  userId          String   @unique\n  hourlyRate      Decimal? @default(0) @db.Decimal(10, 2)\n  yearsExperience Decimal? @default(0) @db.Decimal(10, 2)\n  averageRating   Decimal? @default(0) @db.Decimal(3, 2)\n  isAvailable     Boolean  @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user        User           @relation(fields: [userId], references: [id], onUpdate: Cascade, onDelete: Cascade)\n  subjects    TutorSubject[]\n  bookings    Booking[]      @relation("TutorBookings")\n  availablity Availablity[]\n  reviews     Review[]\n\n  @@map("tutors")\n}\n\nmodel TutorSubject {\n  id         String @id @default(uuid())\n  tutorId    String\n  categoryId String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tutor    Tutor    @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n\n  @@unique([tutorId, categoryId])\n  @@map("tutor_subjects")\n}\n\nmodel User {\n  id            String   @id\n  name          String\n  email         String\n  emailVerified Boolean  @default(false)\n  image         String?\n  bio           String?\n  role          Role     @default(STUDENT)\n  isBanned      Boolean  @default(false)\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  tutor             Tutor?\n  bookingsAsStudent Booking[] @relation("StudentBookings")\n  reviews           Review[]  @relation("StudentReviews")\n\n  sessions Session[]\n  accounts Account[]\n\n  @@unique([email])\n  @@map("users")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Availablity":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isBooked","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"AvailablityToTutor"},{"name":"bookingId","kind":"object","type":"Booking","relationName":"AvailablityToBooking"}],"dbName":"availabilities"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"availabilityId","kind":"scalar","type":"String"},{"name":"scheduleAt","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorBookings"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"availability","kind":"object","type":"Availablity","relationName":"AvailablityToBooking"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"}],"dbName":"bookings"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"iconUrl","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"subjects","kind":"object","type":"TutorSubject","relationName":"CategoryToTutorSubject"}],"dbName":"categories"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"student","kind":"object","type":"User","relationName":"StudentReviews"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"ReviewToTutor"}],"dbName":"reviews"},"Tutor":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"contactNumber","kind":"scalar","type":"String"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"userId","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Decimal"},{"name":"yearsExperience","kind":"scalar","type":"Decimal"},{"name":"averageRating","kind":"scalar","type":"Decimal"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TutorToUser"},{"name":"subjects","kind":"object","type":"TutorSubject","relationName":"TutorToTutorSubject"},{"name":"bookings","kind":"object","type":"Booking","relationName":"TutorBookings"},{"name":"availablity","kind":"object","type":"Availablity","relationName":"AvailablityToTutor"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutor"}],"dbName":"tutors"},"TutorSubject":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorToTutorSubject"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorSubject"}],"dbName":"tutor_subjects"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"isBanned","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorToUser"},{"name":"bookingsAsStudent","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviews","kind":"object","type":"Review","relationName":"StudentReviews"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"users"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","tutor","orderBy","cursor","student","availability","booking","review","bookingsAsStudent","reviews","user","sessions","accounts","_count","subjects","category","bookings","availablity","bookingId","Availablity.findUnique","Availablity.findUniqueOrThrow","Availablity.findFirst","Availablity.findFirstOrThrow","Availablity.findMany","data","Availablity.createOne","Availablity.createMany","Availablity.createManyAndReturn","Availablity.updateOne","Availablity.updateMany","Availablity.updateManyAndReturn","create","update","Availablity.upsertOne","Availablity.deleteOne","Availablity.deleteMany","having","_min","_max","Availablity.groupBy","Availablity.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","_avg","_sum","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Tutor.findUnique","Tutor.findUniqueOrThrow","Tutor.findFirst","Tutor.findFirstOrThrow","Tutor.findMany","Tutor.createOne","Tutor.createMany","Tutor.createManyAndReturn","Tutor.updateOne","Tutor.updateMany","Tutor.updateManyAndReturn","Tutor.upsertOne","Tutor.deleteOne","Tutor.deleteMany","Tutor.groupBy","Tutor.aggregate","TutorSubject.findUnique","TutorSubject.findUniqueOrThrow","TutorSubject.findFirst","TutorSubject.findFirstOrThrow","TutorSubject.findMany","TutorSubject.createOne","TutorSubject.createMany","TutorSubject.createManyAndReturn","TutorSubject.updateOne","TutorSubject.updateMany","TutorSubject.updateManyAndReturn","TutorSubject.upsertOne","TutorSubject.deleteOne","TutorSubject.deleteMany","TutorSubject.groupBy","TutorSubject.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","image","bio","Role","role","isBanned","every","some","none","tutorId","categoryId","contactNumber","Gender","gender","hourlyRate","yearsExperience","averageRating","isAvailable","studentId","comment","rating","slug","iconUrl","availabilityId","scheduleAt","BookingStatus","status","totalPrice","startTime","endTime","isBooked","tutorId_categoryId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "_gRaoAEMAQAAzgIAIBIAAM8CACC7AQAAzQIAMLwBAAAhABC9AQAAzQIAML4BAQAAAAHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACH6AUAAmgIAIfsBQACaAgAh_AEgAKwCACEBAAAAAQAgFQkAALECACAKAAC_AgAgDgAAwAIAIBAAALACACARAADBAgAguwEAALwCADC8AQAAAwAQvQEAALwCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHRAQEAmQIAIdwBAQCZAgAh3QEBAJkCACHfAQEArQIAIekBAQCtAgAh6wEAAL0C6wEi7AEQAL4CACHtARAAvgIAIe4BEAC-AgAh7wEgAKwCACEBAAAAAwAgEAEAAM4CACAEAAC_AgAgBQAA2wIAIAcAANwCACC7AQAA2AIAMLwBAAAFABC9AQAA2AIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh8AEBAJkCACH1AQEAmQIAIfYBQACaAgAh-AEAANkC-AEi-QEQANoCACEEAQAAhQQAIAQAAJYEACAFAAC4BAAgBwAAuQQAIBABAADOAgAgBAAAvwIAIAUAANsCACAHAADcAgAguwEAANgCADC8AQAABQAQvQEAANgCADC-AQEAAAABwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh8AEBAJkCACH1AQEAAAAB9gFAAJoCACH4AQAA2QL4ASL5ARAA2gIAIQMAAAAFACACAAAGADADAAAHACAOAQAAzgIAIAQAAL8CACAGAADXAgAgEgEAmQIAIbsBAADWAgAwvAEAAAkAEL0BAADWAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfEBAQCtAgAh8gEQAL4CACEBAAAACQAgBQEAAIUEACAEAACWBAAgBgAAtgQAIPEBAADiAgAg8gEAAOICACAOAQAAzgIAIAQAAL8CACAGAADXAgAgEgEAAAABuwEAANYCADC8AQAACQAQvQEAANYCADC-AQEAAAABwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh8AEBAJkCACHxAQEArQIAIfIBEAC-AgAhAwAAAAkAIAIAAAsAMAMAAAwAIAwKAAC_AgAguwEAANUCADC8AQAADgAQvQEAANUCADC-AQEAmQIAIcEBQACaAgAhwgFAAJoCACHDAUAAmgIAIdEBAQCZAgAh2QEBAJkCACHaAQEArQIAIdsBAQCtAgAhAwoAAJYEACDaAQAA4gIAINsBAADiAgAgDAoAAL8CACC7AQAA1QIAMLwBAAAOABC9AQAA1QIAML4BAQAAAAHBAUAAmgIAIcIBQACaAgAhwwFAAJoCACHRAQEAmQIAIdkBAQAAAAHaAQEArQIAIdsBAQCtAgAhAwAAAA4AIAIAAA8AMAMAABAAIBEKAAC_AgAguwEAANMCADC8AQAAEgAQvQEAANMCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHPAQEAmQIAIdABAQCZAgAh0QEBAJkCACHSAQEArQIAIdMBAQCtAgAh1AEBAK0CACHVAUAA1AIAIdYBQADUAgAh1wEBAK0CACHYAQEArQIAIQgKAACWBAAg0gEAAOICACDTAQAA4gIAINQBAADiAgAg1QEAAOICACDWAQAA4gIAINcBAADiAgAg2AEAAOICACARCgAAvwIAILsBAADTAgAwvAEAABIAEL0BAADTAgAwvgEBAAAAAcIBQACaAgAhwwFAAJoCACHPAQEAmQIAIdABAQCZAgAh0QEBAJkCACHSAQEArQIAIdMBAQCtAgAh1AEBAK0CACHVAUAA1AIAIdYBQADUAgAh1wEBAK0CACHYAQEArQIAIQMAAAASACACAAATADADAAAUACABAAAABQAgAQAAAAkAIAEAAAAOACABAAAAEgAgCgEAAM4CACAPAADSAgAguwEAANECADC8AQAAGgAQvQEAANECADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIegBAQCZAgAhAgEAAIUEACAPAAC3BAAgCwEAAM4CACAPAADSAgAguwEAANECADC8AQAAGgAQvQEAANECADC-AQEAAAABwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh6AEBAJkCACH9AQAA0AIAIAMAAAAaACACAAAbADADAAAcACADAAAAGgAgAgAAGwAwAwAAHAAgAQAAABoAIAMAAAAFACACAAAGADADAAAHACAMAQAAzgIAIBIAAM8CACC7AQAAzQIAMLwBAAAhABC9AQAAzQIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh-gFAAJoCACH7AUAAmgIAIfwBIACsAgAhAgEAAIUEACASAAC2BAAgAwAAACEAIAIAACIAMAMAAAEAIAMAAAAJACACAAALADADAAAMACABAAAAGgAgAQAAAAUAIAEAAAAhACABAAAACQAgAQAAAAUAIAEAAAABACADAAAAIQAgAgAAIgAwAwAAAQAgAwAAACEAIAIAACIAMAMAAAEAIAMAAAAhACACAAAiADADAAABACAJAQAAtQQAIBIAAOQDACC-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAAB-gFAAAAAAfsBQAAAAAH8ASAAAAABARgAAC4AIAe-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAAB-gFAAAAAAfsBQAAAAAH8ASAAAAABARgAADAAMAEYAAAwADAJAQAAtAQAIBIAANsDACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHnAQEA4AIAIfoBQADhAgAh-wFAAOECACH8ASAA8gIAIQIAAAABACAYAAAzACAHvgEBAOACACHCAUAA4QIAIcMBQADhAgAh5wEBAOACACH6AUAA4QIAIfsBQADhAgAh_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_AgAgDgAAwAIAIBAAALACACARAADBAgAguwEAALwCADC8AQAAAwAQvQEAALwCADC-AQEAAAABwgFAAJoCACHDAUAAmgIAIdEBAQAAAAHcAQEAmQIAId0BAQAAAAHfAQEArQIAIekBAQCtAgAh6wEAAL0C6wEi7AEQAL4CACHtARAAvgIAIe4BEAC-AgAh7wEgAKwCACEBAAAAhAEAIAEAAACEAQAgCgkAAIcEACAKAACWBAAgDgAAlwQAIBAAAIYEACARAACYBAAg3wEAAOICACDpAQAA4gIAIOwBAADiAgAg7QEAAOICACDuAQAA4gIAIAMAAAADACACAACHAQAwAwAAhAEAIAMAAAADACACAACHAQAwAwAAhAEAIAMAAAADACACAACHAQAwAwAAhAEAIBIJAAD_AwAgCgAAlQQAIA4AAPwDACAQAAD9AwAgEQAA_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_AQEAmQIAIcABAQCZAgAhwQFAAJoCACHCAUAAmgIAIcMBQACaAgAhAQAAAPcBACABAAAA9wEAIAm7AQAAmAIAMLwBAAD6AQAQvQEAAJgCADC-AQEAmQIAIb8BAQCZAgAhwAEBAJkCACHBAUAAmgIAIcIBQACaAgAhwwFAAJoCACEAAwAAAPoBACACAAD7AQAwAwAA9wEAIAMAAAD6AQAgAgAA-wEAMAMAAPcBACADAAAA-gEAIAIAAPsBADADAAD3AQAgBr4BAQAAAAG_AQEAAAABwAEBAAAAAcEBQAAAAAHCAUAAAAABwwFAAAAAAQEYAAD_AQAgBr4BAQAAAAG_AQEAAAABwAEBAAAAAcEBQAAAAAHCAUAAAAABwwFAAAAAAQEYAACBAgAwARgAAIECADAGvgEBAOACACG_AQEA4AIAIcABAQDgAgAhwQFAAOECACHCAUAA4QIAIcMBQADhAgAhAgAAAPcBACAYAACEAgAgBr4BAQDgAgAhvwEBAOACACHAAQEA4AIAIcEBQADhAgAhwgFAAOECACHDAUAA4QIAIQIAAAD6AQAgGAAAhgIAIAIAAAD6AQAgGAAAhgIAIAMAAAD3AQAgHwAA_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-AgAh7QEQAL4CACHuARAAvgIAIe8BIACsAgAh_gEAAAMAIP8BAAADACAD5AEAAAUAIOUBAAAFACDmAQAABQAgA-QBAAAJACDlAQAACQAg5gEAAAkAIAPkAQAADgAg5QEAAA4AIOYBAAAOACAD5AEAABIAIOUBAAASACDmAQAAEgAgCLsBAAC0AgAwvAEAAK8BABC9AQAAtAIAML4BAQCRAgAhwgFAAJICACHDAUAAkgIAIecBAQCRAgAh6AEBAJECACEQuwEAALUCADC8AQAAmQEAEL0BAAC1AgAwvgEBAJECACHCAUAAkgIAIcMBQACSAgAh0QEBAJECACHcAQEAkQIAId0BAQCRAgAh3wEBAJwCACHpAQEAnAIAIesBAAC2AusBIuwBEAC3AgAh7QEQALcCACHuARAAtwIAIe8BIAClAgAhBw0AAJQCACAlAAC7AgAgJgAAuwIAIMQBAAAA6wECxQEAAADrAQjGAQAAAOsBCMsBAAC6AusBIg0NAACfAgAgJQAAuQIAICYAALkCACA3AAC5AgAgOAAAuQIAIMQBEAAAAAHFARAAAAAFxgEQAAAABccBEAAAAAHIARAAAAAByQEQAAAAAcoBEAAAAAHLARAAuAIAIQ0NAACfAgAgJQAAuQIAICYAALkCACA3AAC5AgAgOAAAuQIAIMQBEAAAAAHFARAAAAAFxgEQAAAABccBEAAAAAHIARAAAAAByQEQAAAAAcoBEAAAAAHLARAAuAIAIQjEARAAAAABxQEQAAAABcYBEAAAAAXHARAAAAAByAEQAAAAAckBEAAAAAHKARAAAAABywEQALkCACEHDQAAlAIAICUAALsCACAmAAC7AgAgxAEAAADrAQLFAQAAAOsBCMYBAAAA6wEIywEAALoC6wEiBMQBAAAA6wECxQEAAADrAQjGAQAAAOsBCMsBAAC7AusBIhUJAACxAgAgCgAAvwIAIA4AAMACACAQAACwAgAgEQAAwQIAILsBAAC8AgAwvAEAAAMAEL0BAAC8AgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh0QEBAJkCACHcAQEAmQIAId0BAQCZAgAh3wEBAK0CACHpAQEArQIAIesBAAC9AusBIuwBEAC-AgAh7QEQAL4CACHuARAAvgIAIe8BIACsAgAhBMQBAAAA6wECxQEAAADrAQjGAQAAAOsBCMsBAAC7AusBIgjEARAAAAABxQEQAAAABcYBEAAAAAXHARAAAAAByAEQAAAAAckBEAAAAAHKARAAAAABywEQALkCACEUAQAArwIAIAgAALACACAJAACxAgAgCwAAsgIAIAwAALMCACC7AQAAqwIAMLwBAAC1AQAQvQEAAKsCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHcAQEAmQIAId0BAQCZAgAh3gEgAKwCACHfAQEArQIAIeABAQCtAgAh4gEAAK4C4gEi4wEgAKwCACH-AQAAtQEAIP8BAAC1AQAgA-QBAAAaACDlAQAAGgAg5gEAABoAIAPkAQAAIQAg5QEAACEAIOYBAAAhACALEgEAkQIAIbsBAADCAgAwvAEAAIEBABC9AQAAwgIAML4BAQCRAgAhwgFAAJICACHDAUAAkgIAIecBAQCRAgAh8AEBAJECACHxAQEAnAIAIfIBEAC3AgAhCbsBAADDAgAwvAEAAGsAEL0BAADDAgAwvgEBAJECACHCAUAAkgIAIcMBQACSAgAh3AEBAJECACHzAQEAkQIAIfQBAQCcAgAhCg4AAMACACC7AQAAxAIAMLwBAABYABC9AQAAxAIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIdwBAQCZAgAh8wEBAJkCACH0AQEArQIAIQy7AQAAxQIAMLwBAABSABC9AQAAxQIAML4BAQCRAgAhwgFAAJICACHDAUAAkgIAIecBAQCRAgAh8AEBAJECACH1AQEAkQIAIfYBQACSAgAh-AEAAMYC-AEi-QEQAMcCACEHDQAAlAIAICUAAMsCACAmAADLAgAgxAEAAAD4AQLFAQAAAPgBCMYBAAAA-AEIywEAAMoC-AEiDQ0AAJQCACAlAADJAgAgJgAAyQIAIDcAAMkCACA4AADJAgAgxAEQAAAAAcUBEAAAAATGARAAAAAExwEQAAAAAcgBEAAAAAHJARAAAAABygEQAAAAAcsBEADIAgAhDQ0AAJQCACAlAADJAgAgJgAAyQIAIDcAAMkCACA4AADJAgAgxAEQAAAAAcUBEAAAAATGARAAAAAExwEQAAAAAcgBEAAAAAHJARAAAAABygEQAAAAAcsBEADIAgAhCMQBEAAAAAHFARAAAAAExgEQAAAABMcBEAAAAAHIARAAAAAByQEQAAAAAcoBEAAAAAHLARAAyQIAIQcNAACUAgAgJQAAywIAICYAAMsCACDEAQAAAPgBAsUBAAAA-AEIxgEAAAD4AQjLAQAAygL4ASIExAEAAAD4AQLFAQAAAPgBCMYBAAAA-AEIywEAAMsC-AEiCrsBAADMAgAwvAEAADwAEL0BAADMAgAwvgEBAJECACHCAUAAkgIAIcMBQACSAgAh5wEBAJECACH6AUAAkgIAIfsBQACSAgAh_AEgAKUCACEMAQAAzgIAIBIAAM8CACC7AQAAzQIAMLwBAAAhABC9AQAAzQIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh-gFAAJoCACH7AUAAmgIAIfwBIACsAgAhFwkAALECACAKAAC_AgAgDgAAwAIAIBAAALACACARAADBAgAguwEAALwCADC8AQAAAwAQvQEAALwCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHRAQEAmQIAIdwBAQCZAgAh3QEBAJkCACHfAQEArQIAIekBAQCtAgAh6wEAAL0C6wEi7AEQAL4CACHtARAAvgIAIe4BEAC-AgAh7wEgAKwCACH-AQAAAwAg_wEAAAMAIBIBAADOAgAgBAAAvwIAIAUAANsCACAHAADcAgAguwEAANgCADC8AQAABQAQvQEAANgCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIfABAQCZAgAh9QEBAJkCACH2AUAAmgIAIfgBAADZAvgBIvkBEADaAgAh_gEAAAUAIP8BAAAFACAC5wEBAAAAAegBAQAAAAEKAQAAzgIAIA8AANICACC7AQAA0QIAMLwBAAAaABC9AQAA0QIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh6AEBAJkCACEMDgAAwAIAILsBAADEAgAwvAEAAFgAEL0BAADEAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh3AEBAJkCACHzAQEAmQIAIfQBAQCtAgAh_gEAAFgAIP8BAABYACARCgAAvwIAILsBAADTAgAwvAEAABIAEL0BAADTAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAhzwEBAJkCACHQAQEAmQIAIdEBAQCZAgAh0gEBAK0CACHTAQEArQIAIdQBAQCtAgAh1QFAANQCACHWAUAA1AIAIdcBAQCtAgAh2AEBAK0CACEIxAFAAAAAAcUBQAAAAAXGAUAAAAAFxwFAAAAAAcgBQAAAAAHJAUAAAAABygFAAAAAAcsBQACgAgAhDAoAAL8CACC7AQAA1QIAMLwBAAAOABC9AQAA1QIAML4BAQCZAgAhwQFAAJoCACHCAUAAmgIAIcMBQACaAgAh0QEBAJkCACHZAQEAmQIAIdoBAQCtAgAh2wEBAK0CACEOAQAAzgIAIAQAAL8CACAGAADXAgAgEgEAmQIAIbsBAADWAgAwvAEAAAkAEL0BAADWAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfEBAQCtAgAh8gEQAL4CACESAQAAzgIAIAQAAL8CACAFAADbAgAgBwAA3AIAILsBAADYAgAwvAEAAAUAEL0BAADYAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfUBAQCZAgAh9gFAAJoCACH4AQAA2QL4ASL5ARAA2gIAIf4BAAAFACD_AQAABQAgEAEAAM4CACAEAAC_AgAgBQAA2wIAIAcAANwCACC7AQAA2AIAMLwBAAAFABC9AQAA2AIAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh8AEBAJkCACH1AQEAmQIAIfYBQACaAgAh-AEAANkC-AEi-QEQANoCACEExAEAAAD4AQLFAQAAAPgBCMYBAAAA-AEIywEAAMsC-AEiCMQBEAAAAAHFARAAAAAExgEQAAAABMcBEAAAAAHIARAAAAAByQEQAAAAAcoBEAAAAAHLARAAyQIAIQ4BAADOAgAgEgAAzwIAILsBAADNAgAwvAEAACEAEL0BAADNAgAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACH6AUAAmgIAIfsBQACaAgAh_AEgAKwCACH-AQAAIQAg_wEAACEAIBABAADOAgAgBAAAvwIAIAYAANcCACASAQCZAgAhuwEAANYCADC8AQAACQAQvQEAANYCADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIfABAQCZAgAh8QEBAK0CACHyARAAvgIAIf4BAAAJACD_AQAACQAgAAAAAYMCAQAAAAEBgwJAAAAAAQAAAAABgwIBAAAAAQGDAkAAAAABBR8AAPoEACAgAAD9BAAggAIAAPsEACCBAgAA_AQAIIYCAACyAQAgAx8AAPoEACCAAgAA-wQAIIYCAACyAQAgAAAABR8AAPUEACAgAAD4BAAggAIAAPYEACCBAgAA9wQAIIYCAACyAQAgAx8AAPUEACCAAgAA9gQAIIYCAACyAQAgAAAAAYMCIAAAAAEBgwIAAADiAQIHHwAAvQMAICAAAMADACCAAgAAvgMAIIECAAC_AwAghAIAAAMAIIUCAAADACCGAgAAhAEAIAsfAACiAwAwIAAApwMAMIACAACjAwAwgQIAAKQDADCCAgAApQMAIIMCAACmAwAwhAIAAKYDADCFAgAApgMAMIYCAACmAwAwhwIAAKgDADCIAgAAqQMAMAsfAACRAwAwIAAAlgMAMIACAACSAwAwgQIAAJMDADCCAgAAlAMAIIMCAACVAwAwhAIAAJUDADCFAgAAlQMAMIYCAACVAwAwhwIAAJcDADCIAgAAmAMAMAsfAACFAwAwIAAAigMAMIACAACGAwAwgQIAAIcDADCCAgAAiAMAIIMCAACJAwAwhAIAAIkDADCFAgAAiQMAMIYCAACJAwAwhwIAAIsDADCIAgAAjAMAMAsfAAD5AgAwIAAA_gIAMIACAAD6AgAwgQIAAPsCADCCAgAA_AIAIIMCAAD9AgAwhAIAAP0CADCFAgAA_QIAMIYCAAD9AgAwhwIAAP8CADCIAgAAgAMAMAy-AQEAAAABwgFAAAAAAcMBQAAAAAHPAQEAAAAB0AEBAAAAAdIBAQAAAAHTAQEAAAAB1AEBAAAAAdUBQAAAAAHWAUAAAAAB1wEBAAAAAdgBAQAAAAECAAAAFAAgHwAAhAMAIAMAAAAUACAfAACEAwAgIAAAgwMAIAEYAAD0BAAwEQoAAL8CACC7AQAA0wIAMLwBAAASABC9AQAA0wIAML4BAQAAAAHCAUAAmgIAIcMBQACaAgAhzwEBAJkCACHQAQEAmQIAIdEBAQCZAgAh0gEBAK0CACHTAQEArQIAIdQBAQCtAgAh1QFAANQCACHWAUAA1AIAIdcBAQCtAgAh2AEBAK0CACECAAAAFAAgGAAAgwMAIAIAAACBAwAgGAAAggMAIBC7AQAAgAMAMLwBAACBAwAQvQEAAIADADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHPAQEAmQIAIdABAQCZAgAh0QEBAJkCACHSAQEArQIAIdMBAQCtAgAh1AEBAK0CACHVAUAA1AIAIdYBQADUAgAh1wEBAK0CACHYAQEArQIAIRC7AQAAgAMAMLwBAACBAwAQvQEAAIADADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHPAQEAmQIAIdABAQCZAgAh0QEBAJkCACHSAQEArQIAIdMBAQCtAgAh1AEBAK0CACHVAUAA1AIAIdYBQADUAgAh1wEBAK0CACHYAQEArQIAIQy-AQEA4AIAIcIBQADhAgAhwwFAAOECACHPAQEA4AIAIdABAQDgAgAh0gEBAOYCACHTAQEA5gIAIdQBAQDmAgAh1QFAAOcCACHWAUAA5wIAIdcBAQDmAgAh2AEBAOYCACEMvgEBAOACACHCAUAA4QIAIcMBQADhAgAhzwEBAOACACHQAQEA4AIAIdIBAQDmAgAh0wEBAOYCACHUAQEA5gIAIdUBQADnAgAh1gFAAOcCACHXAQEA5gIAIdgBAQDmAgAhDL4BAQAAAAHCAUAAAAABwwFAAAAAAc8BAQAAAAHQAQEAAAAB0gEBAAAAAdMBAQAAAAHUAQEAAAAB1QFAAAAAAdYBQAAAAAHXAQEAAAAB2AEBAAAAAQe-AQEAAAABwQFAAAAAAcIBQAAAAAHDAUAAAAAB2QEBAAAAAdoBAQAAAAHbAQEAAAABAgAAABAAIB8AAJADACADAAAAEAAgHwAAkAMAICAAAI8DACABGAAA8wQAMAwKAAC_AgAguwEAANUCADC8AQAADgAQvQEAANUCADC-AQEAAAABwQFAAJoCACHCAUAAmgIAIcMBQACaAgAh0QEBAJkCACHZAQEAAAAB2gEBAK0CACHbAQEArQIAIQIAAAAQACAYAACPAwAgAgAAAI0DACAYAACOAwAgC7sBAACMAwAwvAEAAI0DABC9AQAAjAMAML4BAQCZAgAhwQFAAJoCACHCAUAAmgIAIcMBQACaAgAh0QEBAJkCACHZAQEAmQIAIdoBAQCtAgAh2wEBAK0CACELuwEAAIwDADC8AQAAjQMAEL0BAACMAwAwvgEBAJkCACHBAUAAmgIAIcIBQACaAgAhwwFAAJoCACHRAQEAmQIAIdkBAQCZAgAh2gEBAK0CACHbAQEArQIAIQe-AQEA4AIAIcEBQADhAgAhwgFAAOECACHDAUAA4QIAIdkBAQDgAgAh2gEBAOYCACHbAQEA5gIAIQe-AQEA4AIAIcEBQADhAgAhwgFAAOECACHDAUAA4QIAIdkBAQDgAgAh2gEBAOYCACHbAQEA5gIAIQe-AQEAAAABwQFAAAAAAcIBQAAAAAHDAUAAAAAB2QEBAAAAAdoBAQAAAAHbAQEAAAABCQEAAKEDACAGAACgAwAgEgEAAAABvgEBAAAAAcIBQAAAAAHDAUAAAAAB5wEBAAAAAfEBAQAAAAHyARAAAAABAgAAAAwAIB8AAJ8DACADAAAADAAgHwAAnwMAICAAAJwDACABGAAA8gQAMA4BAADOAgAgBAAAvwIAIAYAANcCACASAQAAAAG7AQAA1gIAMLwBAAAJABC9AQAA1gIAML4BAQAAAAHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfEBAQCtAgAh8gEQAL4CACECAAAADAAgGAAAnAMAIAIAAACZAwAgGAAAmgMAIAsSAQCZAgAhuwEAAJgDADC8AQAAmQMAEL0BAACYAwAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfEBAQCtAgAh8gEQAL4CACELEgEAmQIAIbsBAACYAwAwvAEAAJkDABC9AQAAmAMAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh8AEBAJkCACHxAQEArQIAIfIBEAC-AgAhBxIBAOACACG-AQEA4AIAIcIBQADhAgAhwwFAAOECACHnAQEA4AIAIfEBAQDmAgAh8gEQAJsDACEFgwIQAAAAAYkCEAAAAAGKAhAAAAABiwIQAAAAAYwCEAAAAAEJAQAAngMAIAYAAJ0DACASAQDgAgAhvgEBAOACACHCAUAA4QIAIcMBQADhAgAh5wEBAOACACHxAQEA5gIAIfIBEACbAwAhBR8AAOoEACAgAADwBAAggAIAAOsEACCBAgAA7wQAIIYCAAAHACAFHwAA6AQAICAAAO0EACCAAgAA6QQAIIECAADsBAAghgIAAIQBACAJAQAAoQMAIAYAAKADACASAQAAAAG-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAAB8QEBAAAAAfIBEAAAAAEDHwAA6gQAIIACAADrBAAghgIAAAcAIAMfAADoBAAggAIAAOkEACCGAgAAhAEAIAsBAAC6AwAgBQAAuwMAIAcAALwDACC-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAAB9QEBAAAAAfYBQAAAAAH4AQAAAPgBAvkBEAAAAAECAAAABwAgHwAAuQMAIAMAAAAHACAfAAC5AwAgIAAArgMAIAEYAADnBAAwEAEAAM4CACAEAAC_AgAgBQAA2wIAIAcAANwCACC7AQAA2AIAMLwBAAAFABC9AQAA2AIAML4BAQAAAAHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfUBAQAAAAH2AUAAmgIAIfgBAADZAvgBIvkBEADaAgAhAgAAAAcAIBgAAK4DACACAAAAqgMAIBgAAKsDACAMuwEAAKkDADC8AQAAqgMAEL0BAACpAwAwvgEBAJkCACHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACHwAQEAmQIAIfUBAQCZAgAh9gFAAJoCACH4AQAA2QL4ASL5ARAA2gIAIQy7AQAAqQMAMLwBAACqAwAQvQEAAKkDADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIfABAQCZAgAh9QEBAJkCACH2AUAAmgIAIfgBAADZAvgBIvkBEADaAgAhCL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh9QEBAOACACH2AUAA4QIAIfgBAACsA_gBIvkBEACtAwAhAYMCAAAA-AECBYMCEAAAAAGJAhAAAAABigIQAAAAAYsCEAAAAAGMAhAAAAABCwEAAK8DACAFAACwAwAgBwAAsQMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh9QEBAOACACH2AUAA4QIAIfgBAACsA_gBIvkBEACtAwAhBR8AANoEACAgAADlBAAggAIAANsEACCBAgAA5AQAIIYCAACEAQAgBR8AANgEACAgAADiBAAggAIAANkEACCBAgAA4QQAIIYCAAABACAHHwAAsgMAICAAALUDACCAAgAAswMAIIECAAC0AwAghAIAAAkAIIUCAAAJACCGAgAADAAgCQEAAKEDACAEAAC4AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB5wEBAAAAAfABAQAAAAHxAQEAAAAB8gEQAAAAAQIAAAAMACAfAACyAwAgAwAAAAkAIB8AALIDACAgAAC2AwAgCwAAAAkAIAEAAJ4DACAEAAC3AwAgGAAAtgMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh8AEBAOACACHxAQEA5gIAIfIBEACbAwAhCQEAAJ4DACAEAAC3AwAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh5wEBAOACACHwAQEA4AIAIfEBAQDmAgAh8gEQAJsDACEFHwAA3AQAICAAAN8EACCAAgAA3QQAIIECAADeBAAghgIAALIBACADHwAA3AQAIIACAADdBAAghgIAALIBACALAQAAugMAIAUAALsDACAHAAC8AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB5wEBAAAAAfUBAQAAAAH2AUAAAAAB-AEAAAD4AQL5ARAAAAABAx8AANoEACCAAgAA2wQAIIYCAACEAQAgAx8AANgEACCAAgAA2QQAIIYCAAABACADHwAAsgMAIIACAACzAwAghgIAAAwAIBAJAAD_AwAgDgAA_AMAIBAAAP0DACARAAD-AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB3AEBAAAAAd0BAQAAAAHfAQEAAAAB6QEBAAAAAesBAAAA6wEC7AEQAAAAAe0BEAAAAAHuARAAAAAB7wEgAAAAAQIAAACEAQAgHwAAvQMAIAMAAAADACAfAAC9AwAgIAAAwQMAIBIAAAADACAJAADGAwAgDgAAwwMAIBAAAMQDACARAADFAwAgGAAAwQMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHfAQEA5gIAIekBAQDmAgAh6wEAAMID6wEi7AEQAJsDACHtARAAmwMAIe4BEACbAwAh7wEgAPICACEQCQAAxgMAIA4AAMMDACAQAADEAwAgEQAAxQMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHfAQEA5gIAIekBAQDmAgAh6wEAAMID6wEi7AEQAJsDACHtARAAmwMAIe4BEACbAwAh7wEgAPICACEBgwIAAADrAQILHwAA7gMAMCAAAPMDADCAAgAA7wMAMIECAADwAwAwggIAAPEDACCDAgAA8gMAMIQCAADyAwAwhQIAAPIDADCGAgAA8gMAMIcCAAD0AwAwiAIAAPUDADALHwAA5QMAMCAAAOkDADCAAgAA5gMAMIECAADnAwAwggIAAOgDACCDAgAApgMAMIQCAACmAwAwhQIAAKYDADCGAgAApgMAMIcCAADqAwAwiAIAAKkDADALHwAA0AMAMCAAANUDADCAAgAA0QMAMIECAADSAwAwggIAANMDACCDAgAA1AMAMIQCAADUAwAwhQIAANQDADCGAgAA1AMAMIcCAADWAwAwiAIAANcDADALHwAAxwMAMCAAAMsDADCAAgAAyAMAMIECAADJAwAwggIAAMoDACCDAgAAlQMAMIQCAACVAwAwhQIAAJUDADCGAgAAlQMAMIcCAADMAwAwiAIAAJgDADAJBAAAuAMAIAYAAKADACASAQAAAAG-AQEAAAABwgFAAAAAAcMBQAAAAAHwAQEAAAAB8QEBAAAAAfIBEAAAAAECAAAADAAgHwAAzwMAIAMAAAAMACAfAADPAwAgIAAAzgMAIAEYAADXBAAwAgAAAAwAIBgAAM4DACACAAAAmQMAIBgAAM0DACAHEgEA4AIAIb4BAQDgAgAhwgFAAOECACHDAUAA4QIAIfABAQDgAgAh8QEBAOYCACHyARAAmwMAIQkEAAC3AwAgBgAAnQMAIBIBAOACACG-AQEA4AIAIcIBQADhAgAhwwFAAOECACHwAQEA4AIAIfEBAQDmAgAh8gEQAJsDACEJBAAAuAMAIAYAAKADACASAQAAAAG-AQEAAAABwgFAAAAAAcMBQAAAAAHwAQEAAAAB8QEBAAAAAfIBEAAAAAEHEgAA5AMAIL4BAQAAAAHCAUAAAAABwwFAAAAAAfoBQAAAAAH7AUAAAAAB_AEgAAAAAQIAAAABACAfAADjAwAgAwAAAAEAIB8AAOMDACAgAADaAwAgARgAANYEADAMAQAAzgIAIBIAAM8CACC7AQAAzQIAMLwBAAAhABC9AQAAzQIAML4BAQAAAAHCAUAAmgIAIcMBQACaAgAh5wEBAJkCACH6AUAAmgIAIfsBQACaAgAh_AEgAKwCACECAAAAAQAgGAAA2gMAIAIAAADYAwAgGAAA2QMAIAq7AQAA1wMAMLwBAADYAwAQvQEAANcDADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIfoBQACaAgAh-wFAAJoCACH8ASAArAIAIQq7AQAA1wMAMLwBAADYAwAQvQEAANcDADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIfoBQACaAgAh-wFAAJoCACH8ASAArAIAIQa-AQEA4AIAIcIBQADhAgAhwwFAAOECACH6AUAA4QIAIfsBQADhAgAh_AEgAPICACEHEgAA2wMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIfoBQADhAgAh-wFAAOECACH8ASAA8gIAIQcfAADcAwAgIAAA3wMAIIACAADdAwAggQIAAN4DACCEAgAABQAghQIAAAUAIIYCAAAHACALAQAAugMAIAQAAOIDACAHAAC8AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB5wEBAAAAAfABAQAAAAH2AUAAAAAB-AEAAAD4AQL5ARAAAAABAgAAAAcAIB8AANwDACADAAAABQAgHwAA3AMAICAAAOADACANAAAABQAgAQAArwMAIAQAAOEDACAHAACxAwAgGAAA4AMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh8AEBAOACACH2AUAA4QIAIfgBAACsA_gBIvkBEACtAwAhCwEAAK8DACAEAADhAwAgBwAAsQMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh8AEBAOACACH2AUAA4QIAIfgBAACsA_gBIvkBEACtAwAhBR8AANEEACAgAADUBAAggAIAANIEACCBAgAA0wQAIIYCAACyAQAgAx8AANEEACCAAgAA0gQAIIYCAACyAQAgBxIAAOQDACC-AQEAAAABwgFAAAAAAcMBQAAAAAH6AUAAAAAB-wFAAAAAAfwBIAAAAAEDHwAA3AMAIIACAADdAwAghgIAAAcAIAsEAADiAwAgBQAAuwMAIAcAALwDACC-AQEAAAABwgFAAAAAAcMBQAAAAAHwAQEAAAAB9QEBAAAAAfYBQAAAAAH4AQAAAPgBAvkBEAAAAAECAAAABwAgHwAA7QMAIAMAAAAHACAfAADtAwAgIAAA7AMAIAEYAADQBAAwAgAAAAcAIBgAAOwDACACAAAAqgMAIBgAAOsDACAIvgEBAOACACHCAUAA4QIAIcMBQADhAgAh8AEBAOACACH1AQEA4AIAIfYBQADhAgAh-AEAAKwD-AEi-QEQAK0DACELBAAA4QMAIAUAALADACAHAACxAwAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh8AEBAOACACH1AQEA4AIAIfYBQADhAgAh-AEAAKwD-AEi-QEQAK0DACELBAAA4gMAIAUAALsDACAHAAC8AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB8AEBAAAAAfUBAQAAAAH2AUAAAAAB-AEAAAD4AQL5ARAAAAABBQ8AAPsDACC-AQEAAAABwgFAAAAAAcMBQAAAAAHoAQEAAAABAgAAABwAIB8AAPoDACADAAAAHAAgHwAA-gMAICAAAPgDACABGAAAzwQAMAsBAADOAgAgDwAA0gIAILsBAADRAgAwvAEAABoAEL0BAADRAgAwvgEBAAAAAcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIegBAQCZAgAh_QEAANACACACAAAAHAAgGAAA-AMAIAIAAAD2AwAgGAAA9wMAIAi7AQAA9QMAMLwBAAD2AwAQvQEAAPUDADC-AQEAmQIAIcIBQACaAgAhwwFAAJoCACHnAQEAmQIAIegBAQCZAgAhCLsBAAD1AwAwvAEAAPYDABC9AQAA9QMAML4BAQCZAgAhwgFAAJoCACHDAUAAmgIAIecBAQCZAgAh6AEBAJkCACEEvgEBAOACACHCAUAA4QIAIcMBQADhAgAh6AEBAOACACEFDwAA-QMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIegBAQDgAgAhBR8AAMoEACAgAADNBAAggAIAAMsEACCBAgAAzAQAIIYCAABVACAFDwAA-wMAIL4BAQAAAAHCAUAAAAABwwFAAAAAAegBAQAAAAEDHwAAygQAIIACAADLBAAghgIAAFUAIAQfAADuAwAwgAIAAO8DADCCAgAA8QMAIIYCAADyAwAwBB8AAOUDADCAAgAA5gMAMIICAADoAwAghgIAAKYDADAEHwAA0AMAMIACAADRAwAwggIAANMDACCGAgAA1AMAMAQfAADHAwAwgAIAAMgDADCCAgAAygMAIIYCAACVAwAwAx8AAL0DACCAAgAAvgMAIIYCAACEAQAgBB8AAKIDADCAAgAAowMAMIICAAClAwAghgIAAKYDADAEHwAAkQMAMIACAACSAwAwggIAAJQDACCGAgAAlQMAMAQfAACFAwAwgAIAAIYDADCCAgAAiAMAIIYCAACJAwAwBB8AAPkCADCAAgAA-gIAMIICAAD8AgAghgIAAP0CADAKCQAAhwQAIAoAAJYEACAOAACXBAAgEAAAhgQAIBEAAJgEACDfAQAA4gIAIOkBAADiAgAg7AEAAOICACDtAQAA4gIAIO4BAADiAgAgAAAAAAAAAAUfAADFBAAgIAAAyAQAIIACAADGBAAggQIAAMcEACCGAgAAhAEAIAMfAADFBAAggAIAAMYEACCGAgAAhAEAIAAAAAAABR8AAMAEACAgAADDBAAggAIAAMEEACCBAgAAwgQAIIYCAACyAQAgAx8AAMAEACCAAgAAwQQAIIYCAACyAQAgBwEAAIUEACAIAACGBAAgCQAAhwQAIAsAAIgEACAMAACJBAAg3wEAAOICACDgAQAA4gIAIAAAAAAAAAAAAAALHwAAogQAMCAAAKYEADCAAgAAowQAMIECAACkBAAwggIAAKUEACCDAgAA8gMAMIQCAADyAwAwhQIAAPIDADCGAgAA8gMAMIcCAACnBAAwiAIAAPUDADAFAQAAjgQAIL4BAQAAAAHCAUAAAAABwwFAAAAAAecBAQAAAAECAAAAHAAgHwAAqgQAIAMAAAAcACAfAACqBAAgIAAAqQQAIAEYAAC_BAAwAgAAABwAIBgAAKkEACACAAAA9gMAIBgAAKgEACAEvgEBAOACACHCAUAA4QIAIcMBQADhAgAh5wEBAOACACEFAQAAjQQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAhBQEAAI4EACC-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAABBB8AAKIEADCAAgAAowQAMIICAAClBAAghgIAAPIDADAAAAAAAAAAAAUfAAC6BAAgIAAAvQQAIIACAAC7BAAggQIAALwEACCGAgAAhAEAIAMfAAC6BAAggAIAALsEACCGAgAAhAEAIAQBAACFBAAgBAAAlgQAIAUAALgEACAHAAC5BAAgAg4AAJcEACD0AQAA4gIAIAIBAACFBAAgEgAAtgQAIAUBAACFBAAgBAAAlgQAIAYAALYEACDxAQAA4gIAIPIBAADiAgAgEQkAAP8DACAKAACVBAAgDgAA_AMAIBAAAP0DACC-AQEAAAABwgFAAAAAAcMBQAAAAAHRAQEAAAAB3AEBAAAAAd0BAQAAAAHfAQEAAAAB6QEBAAAAAesBAAAA6wEC7AEQAAAAAe0BEAAAAAHuARAAAAAB7wEgAAAAAQIAAACEAQAgHwAAugQAIAMAAAADACAfAAC6BAAgIAAAvgQAIBMAAAADACAJAADGAwAgCgAAlAQAIA4AAMMDACAQAADEAwAgGAAAvgQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdEBAQDgAgAh3AEBAOACACHdAQEA4AIAId8BAQDmAgAh6QEBAOYCACHrAQAAwgPrASLsARAAmwMAIe0BEACbAwAh7gEQAJsDACHvASAA8gIAIREJAADGAwAgCgAAlAQAIA4AAMMDACAQAADEAwAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh0QEBAOACACHcAQEA4AIAId0BAQDgAgAh3wEBAOYCACHpAQEA5gIAIesBAADCA-sBIuwBEACbAwAh7QEQAJsDACHuARAAmwMAIe8BIADyAgAhBL4BAQAAAAHCAUAAAAABwwFAAAAAAecBAQAAAAEOCAAAgQQAIAkAAIIEACALAACDBAAgDAAAhAQAIL4BAQAAAAHCAUAAAAABwwFAAAAAAdwBAQAAAAHdAQEAAAAB3gEgAAAAAd8BAQAAAAHgAQEAAAAB4gEAAADiAQLjASAAAAABAgAAALIBACAfAADABAAgAwAAALUBACAfAADABAAgIAAAxAQAIBAAAAC1AQAgCAAA9QIAIAkAAPYCACALAAD3AgAgDAAA-AIAIBgAAMQEACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHcAQEA4AIAId0BAQDgAgAh3gEgAPICACHfAQEA5gIAIeABAQDmAgAh4gEAAPMC4gEi4wEgAPICACEOCAAA9QIAIAkAAPYCACALAAD3AgAgDAAA-AIAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHeASAA8gIAId8BAQDmAgAh4AEBAOYCACHiAQAA8wLiASLjASAA8gIAIREJAAD_AwAgCgAAlQQAIBAAAP0DACARAAD-AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB0QEBAAAAAdwBAQAAAAHdAQEAAAAB3wEBAAAAAekBAQAAAAHrAQAAAOsBAuwBEAAAAAHtARAAAAAB7gEQAAAAAe8BIAAAAAECAAAAhAEAIB8AAMUEACADAAAAAwAgHwAAxQQAICAAAMkEACATAAAAAwAgCQAAxgMAIAoAAJQEACAQAADEAwAgEQAAxQMAIBgAAMkEACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHRAQEA4AIAIdwBAQDgAgAh3QEBAOACACHfAQEA5gIAIekBAQDmAgAh6wEAAMID6wEi7AEQAJsDACHtARAAmwMAIe4BEACbAwAh7wEgAPICACERCQAAxgMAIAoAAJQEACAQAADEAwAgEQAAxQMAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdEBAQDgAgAh3AEBAOACACHdAQEA4AIAId8BAQDmAgAh6QEBAOYCACHrAQAAwgPrASLsARAAmwMAIe0BEACbAwAh7gEQAJsDACHvASAA8gIAIQa-AQEAAAABwgFAAAAAAcMBQAAAAAHcAQEAAAAB8wEBAAAAAfQBAQAAAAECAAAAVQAgHwAAygQAIAMAAABYACAfAADKBAAgIAAAzgQAIAgAAABYACAYAADOBAAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh3AEBAOACACHzAQEA4AIAIfQBAQDmAgAhBr4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh8wEBAOACACH0AQEA5gIAIQS-AQEAAAABwgFAAAAAAcMBQAAAAAHoAQEAAAABCL4BAQAAAAHCAUAAAAABwwFAAAAAAfABAQAAAAH1AQEAAAAB9gFAAAAAAfgBAAAA-AEC-QEQAAAAAQ4BAACABAAgCQAAggQAIAsAAIMEACAMAACEBAAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB3AEBAAAAAd0BAQAAAAHeASAAAAAB3wEBAAAAAeABAQAAAAHiAQAAAOIBAuMBIAAAAAECAAAAsgEAIB8AANEEACADAAAAtQEAIB8AANEEACAgAADVBAAgEAAAALUBACABAAD0AgAgCQAA9gIAIAsAAPcCACAMAAD4AgAgGAAA1QQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHeASAA8gIAId8BAQDmAgAh4AEBAOYCACHiAQAA8wLiASLjASAA8gIAIQ4BAAD0AgAgCQAA9gIAIAsAAPcCACAMAAD4AgAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh3AEBAOACACHdAQEA4AIAId4BIADyAgAh3wEBAOYCACHgAQEA5gIAIeIBAADzAuIBIuMBIADyAgAhBr4BAQAAAAHCAUAAAAABwwFAAAAAAfoBQAAAAAH7AUAAAAAB_AEgAAAAAQcSAQAAAAG-AQEAAAABwgFAAAAAAcMBQAAAAAHwAQEAAAAB8QEBAAAAAfIBEAAAAAEIAQAAtQQAIL4BAQAAAAHCAUAAAAABwwFAAAAAAecBAQAAAAH6AUAAAAAB-wFAAAAAAfwBIAAAAAECAAAAAQAgHwAA2AQAIBEJAAD_AwAgCgAAlQQAIA4AAPwDACARAAD-AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB0QEBAAAAAdwBAQAAAAHdAQEAAAAB3wEBAAAAAekBAQAAAAHrAQAAAOsBAuwBEAAAAAHtARAAAAAB7gEQAAAAAe8BIAAAAAECAAAAhAEAIB8AANoEACAOAQAAgAQAIAgAAIEEACALAACDBAAgDAAAhAQAIL4BAQAAAAHCAUAAAAABwwFAAAAAAdwBAQAAAAHdAQEAAAAB3gEgAAAAAd8BAQAAAAHgAQEAAAAB4gEAAADiAQLjASAAAAABAgAAALIBACAfAADcBAAgAwAAALUBACAfAADcBAAgIAAA4AQAIBAAAAC1AQAgAQAA9AIAIAgAAPUCACALAAD3AgAgDAAA-AIAIBgAAOAEACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHcAQEA4AIAId0BAQDgAgAh3gEgAPICACHfAQEA5gIAIeABAQDmAgAh4gEAAPMC4gEi4wEgAPICACEOAQAA9AIAIAgAAPUCACALAAD3AgAgDAAA-AIAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHeASAA8gIAId8BAQDmAgAh4AEBAOYCACHiAQAA8wLiASLjASAA8gIAIQMAAAAhACAfAADYBAAgIAAA4wQAIAoAAAAhACABAAC0BAAgGAAA4wQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh-gFAAOECACH7AUAA4QIAIfwBIADyAgAhCAEAALQEACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHnAQEA4AIAIfoBQADhAgAh-wFAAOECACH8ASAA8gIAIQMAAAADACAfAADaBAAgIAAA5gQAIBMAAAADACAJAADGAwAgCgAAlAQAIA4AAMMDACARAADFAwAgGAAA5gQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdEBAQDgAgAh3AEBAOACACHdAQEA4AIAId8BAQDmAgAh6QEBAOYCACHrAQAAwgPrASLsARAAmwMAIe0BEACbAwAh7gEQAJsDACHvASAA8gIAIREJAADGAwAgCgAAlAQAIA4AAMMDACARAADFAwAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh0QEBAOACACHcAQEA4AIAId0BAQDgAgAh3wEBAOYCACHpAQEA5gIAIesBAADCA-sBIuwBEACbAwAh7QEQAJsDACHuARAAmwMAIe8BIADyAgAhCL4BAQAAAAHCAUAAAAABwwFAAAAAAecBAQAAAAH1AQEAAAAB9gFAAAAAAfgBAAAA-AEC-QEQAAAAAREKAACVBAAgDgAA_AMAIBAAAP0DACARAAD-AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB0QEBAAAAAdwBAQAAAAHdAQEAAAAB3wEBAAAAAekBAQAAAAHrAQAAAOsBAuwBEAAAAAHtARAAAAAB7gEQAAAAAe8BIAAAAAECAAAAhAEAIB8AAOgEACAMAQAAugMAIAQAAOIDACAFAAC7AwAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB5wEBAAAAAfABAQAAAAH1AQEAAAAB9gFAAAAAAfgBAAAA-AEC-QEQAAAAAQIAAAAHACAfAADqBAAgAwAAAAMAIB8AAOgEACAgAADuBAAgEwAAAAMAIAoAAJQEACAOAADDAwAgEAAAxAMAIBEAAMUDACAYAADuBAAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh0QEBAOACACHcAQEA4AIAId0BAQDgAgAh3wEBAOYCACHpAQEA5gIAIesBAADCA-sBIuwBEACbAwAh7QEQAJsDACHuARAAmwMAIe8BIADyAgAhEQoAAJQEACAOAADDAwAgEAAAxAMAIBEAAMUDACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHRAQEA4AIAIdwBAQDgAgAh3QEBAOACACHfAQEA5gIAIekBAQDmAgAh6wEAAMID6wEi7AEQAJsDACHtARAAmwMAIe4BEACbAwAh7wEgAPICACEDAAAABQAgHwAA6gQAICAAAPEEACAOAAAABQAgAQAArwMAIAQAAOEDACAFAACwAwAgGAAA8QQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIecBAQDgAgAh8AEBAOACACH1AQEA4AIAIfYBQADhAgAh-AEAAKwD-AEi-QEQAK0DACEMAQAArwMAIAQAAOEDACAFAACwAwAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh5wEBAOACACHwAQEA4AIAIfUBAQDgAgAh9gFAAOECACH4AQAArAP4ASL5ARAArQMAIQcSAQAAAAG-AQEAAAABwgFAAAAAAcMBQAAAAAHnAQEAAAAB8QEBAAAAAfIBEAAAAAEHvgEBAAAAAcEBQAAAAAHCAUAAAAABwwFAAAAAAdkBAQAAAAHaAQEAAAAB2wEBAAAAAQy-AQEAAAABwgFAAAAAAcMBQAAAAAHPAQEAAAAB0AEBAAAAAdIBAQAAAAHTAQEAAAAB1AEBAAAAAdUBQAAAAAHWAUAAAAAB1wEBAAAAAdgBAQAAAAEOAQAAgAQAIAgAAIEEACAJAACCBAAgDAAAhAQAIL4BAQAAAAHCAUAAAAABwwFAAAAAAdwBAQAAAAHdAQEAAAAB3gEgAAAAAd8BAQAAAAHgAQEAAAAB4gEAAADiAQLjASAAAAABAgAAALIBACAfAAD1BAAgAwAAALUBACAfAAD1BAAgIAAA-QQAIBAAAAC1AQAgAQAA9AIAIAgAAPUCACAJAAD2AgAgDAAA-AIAIBgAAPkEACC-AQEA4AIAIcIBQADhAgAhwwFAAOECACHcAQEA4AIAId0BAQDgAgAh3gEgAPICACHfAQEA5gIAIeABAQDmAgAh4gEAAPMC4gEi4wEgAPICACEOAQAA9AIAIAgAAPUCACAJAAD2AgAgDAAA-AIAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHeASAA8gIAId8BAQDmAgAh4AEBAOYCACHiAQAA8wLiASLjASAA8gIAIQ4BAACABAAgCAAAgQQAIAkAAIIEACALAACDBAAgvgEBAAAAAcIBQAAAAAHDAUAAAAAB3AEBAAAAAd0BAQAAAAHeASAAAAAB3wEBAAAAAeABAQAAAAHiAQAAAOIBAuMBIAAAAAECAAAAsgEAIB8AAPoEACADAAAAtQEAIB8AAPoEACAgAAD-BAAgEAAAALUBACABAAD0AgAgCAAA9QIAIAkAAPYCACALAAD3AgAgGAAA_gQAIL4BAQDgAgAhwgFAAOECACHDAUAA4QIAIdwBAQDgAgAh3QEBAOACACHeASAA8gIAId8BAQDmAgAh4AEBAOYCACHiAQAA8wLiASLjASAA8gIAIQ4BAAD0AgAgCAAA9QIAIAkAAPYCACALAAD3AgAgvgEBAOACACHCAUAA4QIAIcMBQADhAgAh3AEBAOACACHdAQEA4AIAId4BIADyAgAh3wEBAOYCACHgAQEA5gIAIeIBAADzAuIBIuMBIADyAgAhAgEAAhIpBAYJJAUKAAMNAAwOHQkQIAQRIwEGAQQCCAgECQ0FCxEGDBUHDQAIBAEAAgQAAwUAAQcKBQMBAAIEAAMGAAQBCgADAQoAAwQIFgAJFwALGAAMGQACAQACDwAKAg0ACw4eCQEOHwAECSgADiUAECYAEScAAAEBAAIBAQACAw0AESUAEiYAEwAAAAMNABElABImABMDAQACBAADBQABAwEAAgQAAwUAAQUNABglABsmABw3ABk4ABoAAAAAAAUNABglABsmABw3ABk4ABoAAAMNACElACImACMAAAADDQAhJQAiJgAjAwEAAgQAAwYABAMBAAIEAAMGAAQFDQAoJQArJgAsNwApOAAqAAAAAAAFDQAoJQArJgAsNwApOAAqAQoAAwEKAAMFDQAxJQA0JgA1NwAyOAAzAAAAAAAFDQAxJQA0JgA1NwAyOAAzAgEAAg8ACgIBAAIPAAoDDQA6JQA7JgA8AAAAAw0AOiUAOyYAPAAAAw0AQSUAQiYAQwAAAAMNAEElAEImAEMBCgADAQoAAwMNAEglAEkmAEoAAAADDQBIJQBJJgBKAQoAAwEKAAMDDQBPJQBQJgBRAAAAAw0ATyUAUCYAUQAAAAMNAFclAFgmAFkAAAADDQBXJQBYJgBZEwIBFCoBFSsBFiwBFy0BGS8BGjENGzIOHDQBHTYNHjcPITgBIjkBIzoNJz0QKD4UKT8EKkAEK0EELEIELUMELkUEL0cNMEgVMUoEMkwNM00WNE4ENU8ENlANOVMXOlQdO1YKPFcKPVoKPlsKP1wKQF4KQWANQmEeQ2MKRGUNRWYfRmcKR2gKSGkNSWwgSm0kS24FTG8FTXAFTnEFT3IFUHQFUXYNUnclU3kFVHsNVXwmVn0FV34FWH8NWYIBJ1qDAS1bhQECXIYBAl2IAQJeiQECX4oBAmCMAQJhjgENYo8BLmORAQJkkwENZZQBL2aVAQJnlgECaJcBDWmaATBqmwE2a5wBCWydAQltngEJbp8BCW-gAQlwogEJcaQBDXKlATdzpwEJdKkBDXWqATh2qwEJd6wBCXitAQ15sAE5erEBPXuzAQN8tAEDfbcBA364AQN_uQEDgAG7AQOBAb0BDYIBvgE-gwHAAQOEAcIBDYUBwwE_hgHEAQOHAcUBA4gBxgENiQHJAUCKAcoBRIsBywEGjAHMAQaNAc0BBo4BzgEGjwHPAQaQAdEBBpEB0wENkgHUAUWTAdYBBpQB2AENlQHZAUaWAdoBBpcB2wEGmAHcAQ2ZAd8BR5oB4AFLmwHhAQecAeIBB50B4wEHngHkAQefAeUBB6AB5wEHoQHpAQ2iAeoBTKMB7AEHpAHuAQ2lAe8BTaYB8AEHpwHxAQeoAfIBDakB9QFOqgH2AVKrAfgBU6wB-QFTrQH8AVOuAf0BU68B_gFTsAGAAlOxAYICDbIBgwJUswGFAlO0AYcCDbUBiAJVtgGJAlO3AYoCU7gBiwINuQGOAla6AY8CWg"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/enums.ts
var BookingStatus = {
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/config/env.ts
import dotenv from "dotenv";

// src/app/helpers/appError.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

// src/app/config/env.ts
dotenv.config();
var loadEnvVariables = () => {
  const requitedEnvVars = [
    "PORT",
    "APP_URL",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_EXPIRES_IN"
  ];
  requitedEnvVars.forEach((ev) => {
    if (!process.env[ev]) {
      throw new AppError(`Environment variable ${ev} is required. But it's missing in env file`, 500);
    }
  });
  return {
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN
  };
};
var envVars = loadEnvVariables();

// src/app/lib/auth.ts
var auth = betterAuth({
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [envVars.APP_URL, envVars.BETTER_AUTH_URL],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    // 7 days
    updateAge: 60 * 60 * 24
    // update every day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT" /* STUDENT */,
        required: true,
        input: true
      },
      isBanned: {
        type: "boolean",
        defaultValue: false,
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  }
});

// src/app.ts
import { toNodeHandler } from "better-auth/node";

// src/app/routes/index.ts
import { Router } from "express";

// src/app/modules/tutor/tutor.route.ts
import express from "express";

// src/app/modules/tutor/tutor.service.ts
var getAllTutors = async () => {
  return await prisma.tutor.findMany({
    include: {
      user: true,
      subjects: {
        select: { category: true }
      },
      bookings: true,
      reviews: true,
      availablity: true
    }
  });
};
var getTutorById = async (id) => {
  return await prisma.tutor.findUnique({
    where: {
      id
    },
    include: {
      user: true,
      subjects: {
        select: { category: true }
      },
      bookings: true,
      reviews: true,
      availablity: true
    }
  });
};
var updateProfile = async (user, payload) => {
  if (user.role !== "TUTOR" /* TUTOR */) {
    throw new AppError("Only tutors can update profile", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  return await prisma.tutor.update({
    where: { id: tutor.id },
    data: payload
  });
};
var createAvailablity = async (user, payload) => {
  const { startTime, endTime } = payload;
  if (user.role !== "TUTOR" /* TUTOR */) {
    throw new AppError("Only tutors can create availability", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  if (start >= end) {
    throw new AppError("Ensuring the start time is less than the end time", 400);
  }
  if (start < Date.now()) {
    throw new AppError("Availability cannot be in the past", 400);
  }
  const existAvailablity = await prisma.availablity.findFirst({
    where: {
      tutorId: tutor.id,
      startTime: { lte: new Date(endTime) },
      endTime: { gte: new Date(startTime) }
    }
  });
  if (existAvailablity) {
    throw new AppError("Availability overlaps with an existing slot", 409);
  }
  const result = await prisma.availablity.create({
    data: {
      tutorId: tutor.id,
      ...payload
    }
  });
  return result;
};
var updateAvialablity = async (user, availableId, payload) => {
  const { startTime, endTime } = payload;
  if (user.role !== "TUTOR" /* TUTOR */) {
    throw new AppError("Only tutors can update availability", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("You are not a registered tutor", 404);
  }
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  if (start >= end) {
    throw new AppError("Ensuring the start time is less than the end time", 400);
  }
  if (start < Date.now()) {
    throw new AppError("Availability cannot be in the past", 400);
  }
  const existAvailablity = await prisma.availablity.findFirst({
    where: {
      tutorId: tutor.id,
      startTime: { lte: new Date(endTime) },
      endTime: { gte: new Date(startTime) }
    }
  });
  if (existAvailablity) {
    throw new AppError("Availability overlaps with an existing slot", 409);
  }
  const result = await prisma.availablity.update({
    where: {
      id: availableId
    },
    data: {
      ...payload
    }
  });
  return result;
};
var deleteAvialablity = async (user, availableId) => {
  if (user.role !== "TUTOR" /* TUTOR */) {
    throw new AppError("Only tutors can delete availability", 403);
  }
  const tutor = await prisma.tutor.findUnique(
    {
      where: { userId: user.userId }
    }
  );
  if (!tutor) {
    throw new AppError("You are not a registered tutor", 404);
  }
  const availablity = await prisma.availablity.findUnique({
    where: {
      id: availableId
    }
  });
  if (!availablity) {
    throw new AppError("Availability not found", 404);
  }
  if (availablity.tutorId !== tutor.id) {
    throw new AppError("You are not authorized to delete this availability", 403);
  }
  const result = await prisma.availablity.delete({
    where: {
      id: availableId
    }
  });
  return result;
};
var tutorService = {
  getAllTutors,
  updateProfile,
  createAvailablity,
  updateAvialablity,
  getTutorById,
  deleteAvialablity
};

// src/app/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { statusCode, success, message, data, meta } = responseData;
  res.status(statusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/app/modules/tutor/tutor.controller.ts
var getAllTutors2 = catchAsync(
  async (req, res) => {
    const result = await tutorService.getAllTutors();
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Retrive all Tutors succussfully",
      data: result
    });
  }
);
var getTutorById2 = catchAsync(
  async (req, res) => {
    const { tutorId } = req.params;
    const result = await tutorService.getTutorById(tutorId);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Retrive Tutor successfully",
      data: result
    });
  }
);
var updateProfile2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await tutorService.updateProfile(user, payload);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Profile update succussfully",
      data: result
    });
  }
);
var createAvailablity2 = catchAsync(
  async (req, res) => {
    const user = req?.user;
    const payload = req.body;
    const result = await tutorService.createAvailablity(user, payload);
    sendResponse(res, {
      statusCode: 201,
      success: false,
      message: "Availablity create succussfully",
      data: result
    });
  }
);
var updateAvialablity2 = catchAsync(
  async (req, res) => {
    const user = req?.user;
    const { availableId } = req.params;
    const payload = req.body;
    const result = await tutorService.updateAvialablity(user, availableId, payload);
    sendResponse(res, {
      statusCode: 201,
      success: false,
      message: "Availablity updated succussfully",
      data: result
    });
  }
);
var deleteAvialablity2 = catchAsync(
  async (req, res) => {
    const user = req?.user;
    const { availableId } = req.params;
    const result = await tutorService.deleteAvialablity(user, availableId);
    sendResponse(res, {
      statusCode: 200,
      success: false,
      message: "Availablity deleted succussfully",
      data: result
    });
  }
);
var tutorController = {
  getAllTutors: getAllTutors2,
  updateProfile: updateProfile2,
  createAvailablity: createAvailablity2,
  updateAvialablity: updateAvialablity2,
  getTutorById: getTutorById2,
  deleteAvialablity: deleteAvialablity2
};

// src/app/utils/cookies.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, options) => {
  const token = jwt.sign(payload, secret, options);
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decode = jwt.verify(token, secret);
    return {
      success: true,
      message: "Successfully verify",
      data: decode
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var JwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/app/middleware/authentication.ts
var authentication = (...roles) => {
  return async (req, res, next) => {
    try {
      const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");
      if (!sessionToken) {
        throw new AppError("Unauthorized: No session token provided.", 401);
      }
      if (sessionToken) {
        const sessionExist = await prisma.session.findFirst({
          where: {
            token: sessionToken,
            expiresAt: {
              gt: /* @__PURE__ */ new Date()
            }
          },
          include: { user: true }
        });
        if (sessionExist && sessionExist.user) {
          const user = sessionExist.user;
          const now = /* @__PURE__ */ new Date();
          const expiresAt = new Date(sessionExist.expiresAt);
          const createdAt = new Date(sessionExist.createdAt);
          const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
          const remainingTime = expiresAt.getTime() - now.getTime();
          const percentageRemaining = remainingTime / sessionLifeTime * 100;
          if (percentageRemaining < 20) {
            res.setHeader("X-Session-Refresh", "true");
            res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
            res.setHeader("X-Time-Remaining", remainingTime.toString());
          }
          if (user.isBanned) {
            throw new AppError("Your account has been banned. Please contact support for more information.", 403);
          }
          req.user = {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
          if (roles.length && !roles.includes(req.user.role)) {
            throw new AppError(
              "Forbidden: You do not have the necessary permissions to access this resource.",
              403
            );
          }
        }
        const accessToken2 = CookieUtils.getCookie(req, "accessToken");
        if (!accessToken2) {
          throw new AppError("Unauthorized access! No access token provided.", 401);
        }
      }
      const accessToken = CookieUtils.getCookie(req, "accessToken");
      if (!accessToken) {
        throw new AppError("Unauthorized: No access token provided.", 401);
      }
      const verifyToken2 = JwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);
      if (!verifyToken2.success) {
        throw new AppError("Unauthorized: Invalid access token.", 401);
      }
      if (roles.length && !roles.includes(req.user?.role)) {
        throw new AppError(
          "Forbidden: You do not have the necessary permissions to access this resource.",
          403
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var authentication_default = authentication;

// src/app/modules/tutor/tutor.route.ts
var router = express.Router();
router.get("/", tutorController.getAllTutors);
router.get("/:tutorId", tutorController.getTutorById);
router.post("/availability", authentication_default("TUTOR" /* TUTOR */), tutorController.createAvailablity);
router.put("/profile", authentication_default("TUTOR" /* TUTOR */), tutorController.updateProfile);
router.put("/availability/:availableId", authentication_default("TUTOR" /* TUTOR */), tutorController.updateAvialablity);
router.delete("/availability/:availableId", authentication_default("TUTOR" /* TUTOR */), tutorController.deleteAvialablity);
var tutorRoutes = router;

// src/app/modules/category/category.route.ts
import express2 from "express";

// src/app/modules/category/category.service.ts
var getAllCategory = async () => {
  return await prisma.category.findMany({
    include: { subjects: true }
  });
};
var getSingleCategory = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id
    }
  });
};
var createCategory = async (payload) => {
  const categorySlug = payload.name.toLocaleLowerCase().replace(" ", "-").trim();
  return await prisma.category.create({
    data: {
      ...payload,
      slug: categorySlug
    }
  });
};
var updateCategory = async (id, payload) => {
  const categorySlug = payload.name.toLocaleLowerCase().replace(" ", "-").trim();
  return await prisma.category.update({
    where: {
      id
    },
    data: {
      ...payload,
      slug: categorySlug
    }
  });
};
var deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: {
      id
    }
  });
};
var categoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/app/modules/category/category.controller.ts
var getAllCategory2 = catchAsync(
  async (req, res) => {
    const result = await categoryService.getAllCategory();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive categories successfully",
      data: result
    });
  }
);
var getSingleCategory2 = catchAsync(
  async (req, res) => {
    const { categoryId } = req.params;
    const result = await categoryService.getSingleCategory(categoryId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive category successfully",
      data: result
    });
  }
);
var createCategory2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await categoryService.createCategory(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created Successfully",
      data: result
    });
  }
);
var updateCategory2 = catchAsync(
  async (req, res) => {
    const { categoryId } = req.params;
    const payload = req.body;
    const result = await categoryService.updateCategory(categoryId, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Update category successfully",
      data: result
    });
  }
);
var deleteCategory2 = catchAsync(
  async (req, res) => {
    const { categoryId } = req.params;
    const result = await categoryService.deleteCategory(categoryId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Delete category successfully"
    });
  }
);
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/app/modules/category/category.route.ts
var router2 = express2.Router();
router2.post("/", authentication_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), categoryController.createCategory);
router2.get("/", categoryController.getAllCategory);
router2.get("/:categoryId", categoryController.getSingleCategory);
router2.put("/:categoryId", authentication_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), categoryController.updateCategory);
router2.delete("/:categoryId", authentication_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), categoryController.deleteCategory);
var categoryRoutes = router2;

// src/app/modules/user/user.route.ts
import express3 from "express";

// src/app/modules/user/user.service.ts
var creatTutor = async (payload) => {
  const existUser = await prisma.user.findUnique({
    where: { email: payload.tutor.email }
  });
  if (existUser) {
    throw new AppError("User already exists", 400);
  }
  const userData = await auth.api.signUpEmail({
    body: {
      name: payload.tutor.name,
      email: payload.tutor.email,
      password: payload.password,
      role: "TUTOR" /* TUTOR */
    }
  });
  try {
    const result = await prisma.$transaction(async (tx) => {
      const tutorData = await tx.tutor.create({
        data: {
          userId: userData.user.id,
          ...payload.tutor
        }
      });
      return tutorData;
    });
    return result;
  } catch (error) {
    await prisma.user.delete({
      where: { id: userData.user.id }
    });
  }
};
var getAllUser = async (user) => {
  if (user.role !== "ADMIN" /* ADMIN */) {
    throw new AppError("Access Denied!", 403);
  }
  return await prisma.user.findMany({
    where: { isBanned: false }
  });
};
var updateUserStatus = async (user, userId, userStatus) => {
  if (user.role !== "ADMIN" /* ADMIN */) {
    throw new AppError("Access Denied!", 403);
  }
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isBanned: userStatus
    }
  });
};
var updateUser = async (id, user, data, isAdmin) => {
  const exists = await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  });
  if (!isAdmin && exists.id !== id) {
    throw new AppError("Access Denied!", 403);
  }
  if (!isAdmin) {
    delete data.isBanned;
  }
  return await prisma.user.update({
    where: {
      id
    },
    data
  });
};
var userService = {
  creatTutor,
  getAllUser,
  updateUserStatus,
  updateUser
};

// src/app/modules/user/user.controller.ts
var createTutor = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await userService.creatTutor(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Tutor Profile create succussfully",
      data: result
    });
  }
);
var getAllUser2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await userService.getAllUser(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive all Users succussfully",
      data: result
    });
  }
);
var updateUser2 = catchAsync(
  async (req, res) => {
    const { userId } = req.params;
    const user = req.user;
    const payload = req.body;
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await userService.updateUser(userId, user, payload, isAdmin);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Update User succussfully",
      data: result
    });
  }
);
var updateUserStatus2 = catchAsync(
  async (req, res) => {
    const user = req?.user;
    const { user_id } = req.params;
    const { isBanned } = req.body;
    const result = await userService.updateUserStatus(user, user_id, isBanned);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status update succussfully",
      data: result
    });
  }
);
var userController = {
  createTutor,
  getAllUser: getAllUser2,
  updateUser: updateUser2,
  updateUserStatus: updateUserStatus2
};

// src/app/modules/user/user.route.ts
var router3 = express3.Router();
router3.post("/create-tutor", userController.createTutor);
router3.get("/", authentication_default("ADMIN" /* ADMIN */), userController.getAllUser);
router3.put("/:user_id", authentication_default("ADMIN" /* ADMIN */), userController.updateUserStatus);
router3.put("/:userId", authentication_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), userController.updateUser);
var userRoutes = router3;

// src/app/modules/booking/booking.route.ts
import express4 from "express";

// src/app/modules/booking/booking.service.ts
var getAllBooking = async (user) => {
  let whereClause = {};
  if (user.role === "STUDENT" /* STUDENT */) {
    whereClause = { studentId: user.userId };
  } else if (user.role === "TUTOR" /* TUTOR */) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId: user.userId }
    });
    if (!tutor) {
      throw new AppError("Tutor profile not found", 404);
    }
    whereClause = { tutorId: tutor.id };
  } else if (user.role === "ADMIN" /* ADMIN */) {
    whereClause = {};
  } else {
    throw new AppError("Unauthorized", 403);
  }
  const result = await prisma.booking.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      tutor: {
        select: {
          name: true,
          email: true,
          gender: true,
          image: true
        }
      },
      student: {
        select: {
          name: true,
          email: true,
          image: true
        }
      },
      availability: {
        select: {
          startTime: true,
          endTime: true
        }
      },
      review: {
        select: {
          bookingId: true,
          studentId: true,
          tutorId: true,
          rating: true,
          comment: true
        }
      }
    }
  });
  return result;
};
var getBookingById = async (user, bookingId) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      tutor: {
        select: {
          name: true,
          email: true,
          gender: true,
          image: true
        }
      },
      student: {
        select: {
          name: true,
          email: true,
          image: true
        }
      },
      availability: {
        select: {
          startTime: true,
          endTime: true
        }
      },
      review: {
        select: {
          bookingId: true,
          studentId: true,
          tutorId: true,
          rating: true,
          comment: true
        }
      }
    }
  });
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }
  if (user.role === "ADMIN" /* ADMIN */) {
    return booking;
  }
  if (user.role === "STUDENT" /* STUDENT */) {
    if (booking.studentId !== user.userId) {
      throw new AppError("You are not authorized to view this booking", 403);
    }
    return booking;
  }
  if (user.role === "TUTOR" /* TUTOR */) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId: user.userId }
    });
    if (!tutor) {
      throw new AppError("Tutor profile not found", 404);
    }
    if (booking.tutorId !== tutor?.id) {
      throw new AppError("You are not authorized to view this booking", 403);
    }
    return booking;
  }
  throw new AppError("Unauthorized", 403);
};
var createBooking = async (user, payload) => {
  if (user.role !== "STUDENT" /* STUDENT */) {
    throw new AppError("Only students can book", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: {
      id: payload.tutorId
    }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  if (!tutor.isAvailable) {
    throw new AppError("Tutor is not currently accepting bookings", 400);
  }
  if (tutor.userId === user.userId) {
    throw new AppError("You cannot book your own session", 400);
  }
  const availablity = await prisma.availablity.findFirst({
    where: {
      id: payload.availabilityId
    }
  });
  if (!availablity) {
    throw new AppError("Tutor not available at this time", 400);
  }
  if (availablity.isBooked) {
    throw new AppError("This slot is already booked", 400);
  }
  if (availablity.tutorId !== payload.tutorId) {
    throw new AppError("This slot does not belong to the selected tutor", 400);
  }
  const diffHours = (availablity.endTime.getTime() - availablity.startTime.getTime()) / (1e3 * 60 * 60);
  const totalPrice = Number(tutor.hourlyRate) * diffHours;
  const result = await prisma.booking.create({
    data: {
      studentId: user.userId,
      tutorId: payload.tutorId,
      availabilityId: payload.availabilityId,
      scheduleAt: availablity.startTime,
      totalPrice
    }
  });
  await prisma.availablity.update({
    where: { id: payload.availabilityId },
    data: { isBooked: true }
  });
  return result;
};
var updateBookingStatus = async (user, bookId, status) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookId, studentId: user.userId }
  });
  if (!booking) throw new AppError("Booking not found", 404);
  if (booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.COMPLETED) {
    throw new AppError("This booking is already closed and cannot be changed", 400);
  }
  if (user.role === "STUDENT" /* STUDENT */) {
    if (booking.studentId !== user.userId) {
      throw new AppError("You are not authorized to update this booking", 403);
    }
    if (status !== BookingStatus.CANCELLED) {
      throw new AppError("Students can only cancel the booking", 403);
    }
  } else if (user.role === "TUTOR" /* TUTOR */) {
    const tutor = await prisma.tutor.findUnique({
      where: { userId: user.userId }
    });
    if (!tutor) {
      throw new AppError("Tutor profile not found", 404);
    }
    if (booking.tutorId !== tutor.id) {
      throw new AppError("You are not authorized to update this booking", 403);
    }
    if (status !== BookingStatus.COMPLETED) {
      throw new AppError("Tutors can only confirm or complete the booking", 403);
    }
  } else if (user.role === "ADMIN" /* ADMIN */) {
    if (![BookingStatus.CONFIRMED, BookingStatus.CANCELLED, BookingStatus.COMPLETED].includes(status)) {
      throw new AppError("Invalid status update", 400);
    }
  } else {
    throw new AppError("Unauthorized", 403);
  }
  const result = await prisma.booking.update({
    where: { id: bookId },
    data: { status }
  });
  if (status === BookingStatus.CANCELLED) {
    await prisma.availablity.update({
      where: { id: booking.availabilityId },
      data: { isBooked: false }
    });
  }
  if (status === BookingStatus.COMPLETED) {
    await prisma.availablity.update({
      where: { id: booking.availabilityId },
      data: { isBooked: false }
    });
  }
  return result;
};
var bookingService = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingStatus
};

// src/app/modules/booking/booking.controller.ts
var getAllBooking2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await bookingService.getAllBooking(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive all bookings successfully",
      data: result
    });
  }
);
var getBookingById2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const { bookingId } = req?.params;
    const result = await bookingService.getBookingById(user, bookingId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrive booking successfully",
      data: result
    });
  }
);
var createBooking2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await bookingService.createBooking(user, payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booked successfully",
      data: result
    });
  }
);
var updateBookingStatus2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const { bookingId } = req?.params;
    const { status } = req.body;
    const result = await bookingService.updateBookingStatus(
      user,
      bookingId,
      status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Update booking status successfully",
      data: result
    });
  }
);
var bookingController = {
  createBooking: createBooking2,
  getAllBooking: getAllBooking2,
  getBookingById: getBookingById2,
  updateBookingStatus: updateBookingStatus2
};

// src/app/modules/booking/booking.route.ts
var router4 = express4.Router();
router4.get("/", authentication_default("STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */), bookingController.getAllBooking);
router4.post("/", authentication_default("STUDENT" /* STUDENT */), bookingController.createBooking);
router4.get("/:bookingId", authentication_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), bookingController.getBookingById);
router4.put("/:bookingId", authentication_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */), bookingController.updateBookingStatus);
var bookingRoutes = router4;

// src/app/modules/review/review.route.ts
import express5 from "express";

// src/app/modules/review/review.service.ts
var createReview = async (user, payload) => {
  if (user.role !== "STUDENT" /* STUDENT */) {
    throw new AppError("Only students can leave reviews", 403);
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId
    }
  });
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }
  if (booking.studentId !== user.userId) {
    throw new AppError("You cannot review this session", 403);
  }
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new AppError(
      "You can review only after the session is completed",
      403
    );
  }
  const alreadyReview = await prisma.review.findFirst({
    where: {
      bookingId: payload.bookingId
    }
  });
  if (alreadyReview) {
    throw new AppError("Review already submitted", 400);
  }
  const review = await prisma.review.create({
    data: {
      bookingId: payload.bookingId,
      studentId: user.userId,
      tutorId: booking.tutorId,
      rating: payload.rating,
      comment: payload.comment
    }
  });
  const stats = await prisma.review.aggregate({
    where: { tutorId: booking.tutorId },
    _avg: { rating: true },
    _count: { rating: true }
  });
  await prisma.tutor.update({
    where: { id: booking.tutorId },
    data: {
      averageRating: stats._avg.rating ?? 0
    }
  });
  return review;
};
var reviewService = {
  createReview
};

// src/app/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await reviewService.createReview(user, payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review Create successfully",
    data: result
  });
};
var reviewController = {
  createReview: createReview2
};

// src/app/modules/review/review.route.ts
var router5 = express5.Router();
router5.post(
  "/",
  authentication_default("STUDENT" /* STUDENT */),
  reviewController.createReview
);
var reviewRoutes = router5;

// src/app/modules/auth/auth.route.ts
import express6 from "express";

// src/app/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = JwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = JwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 * 1e3
  });
};
var setBetterAuthSessionCooke = (res, token) => {
  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCooke
};

// src/app/modules/auth/auth.service.ts
var createUser = async (payload) => {
  const existUser = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (existUser) {
    throw new AppError("User already exists", 400);
  }
  const data = await auth.api.signUpEmail({
    body: payload
  });
  if (!data.user) {
    throw new AppError("Failed to create user", 500);
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isBanned: data.user.isBanned
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isBanned: data.user.isBanned
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  const data = await auth.api.signInEmail({
    body: {
      email,
      password
    },
    headers: new Headers()
  });
  const accessToken = tokenUtils.getAccessToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isBanned: data.user.isBanned
  });
  const refreshToken = tokenUtils.getRefreshToken({
    userId: data.user.id,
    role: data.user.role,
    name: data.user.name,
    email: data.user.email,
    isBanned: data.user.isBanned
  });
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var getMe = async (userData) => {
  if (!userData?.userId) {
    throw new AppError("User data is missing or invalid", 401);
  }
  const existUser = await prisma.user.findUnique({
    where: {
      id: userData.userId
    },
    include: {
      tutor: true,
      bookingsAsStudent: true,
      reviews: true
    }
  });
  if (!existUser) {
    throw new AppError("User not found", 404);
  }
  return existUser;
};
var logOut = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};
var authService = {
  createUser,
  loginUser,
  getMe,
  logOut
};

// src/app/modules/auth/auth.controller.ts
var createUser2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await authService.createUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCooke(res, token);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Register successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var loginUser2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const result = await authService.loginUser(payload);
    const { accessToken, refreshToken, token, ...rest } = result;
    tokenUtils.setAccessTokenCookie(res, accessToken);
    tokenUtils.setRefreshTokenCookie(res, refreshToken);
    tokenUtils.setBetterAuthSessionCooke(res, token);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successfully",
      data: {
        token,
        accessToken,
        refreshToken,
        ...rest
      }
    });
  }
);
var getMe2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    console.log({ user });
    const result = await authService.getMe(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile fetched successfully",
      data: result
    });
  }
);
var logOut2 = catchAsync(
  async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authService.logOut(betterAuthSessionToken);
    CookieUtils.clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    CookieUtils.clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    CookieUtils.clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logout successfully"
    });
  }
);
var authController = {
  loginUser: loginUser2,
  createUser: createUser2,
  getMe: getMe2,
  logOut: logOut2
};

// src/app/modules/auth/auth.route.ts
var router6 = express6.Router();
router6.post("/register", authController.createUser);
router6.post("/login", authController.loginUser);
router6.get("/me", authentication_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), authController.getMe);
router6.post("/logout", authController.logOut);
var authRoutes = router6;

// src/app/modules/subject/subject.route.ts
import express7 from "express";

// src/app/modules/subject/subject.service.ts
var getAllSubject = async () => {
  return await prisma.tutorSubject.findMany({
    include: {
      category: true,
      tutor: true
    }
  });
};
var createSubject = async (user, payload) => {
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  return await prisma.tutorSubject.create({
    data: {
      tutorId: tutor.id,
      categoryId: payload.categoryId
    },
    include: {
      tutor: true,
      category: true
    }
  });
};
var updateSubject = async (user, id, payload) => {
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  return await prisma.tutorSubject.update({
    where: {
      id
    },
    data: {
      categoryId: payload.categoryId
    },
    include: {
      category: true
    }
  });
};
var deleteSubject = async (user, id) => {
  if (user.role !== "TUTOR") {
    throw new AppError("Only tutors can delete subject", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: { userId: user.userId }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  const subject = await prisma.tutorSubject.findUnique({
    where: {
      id
    }
  });
  if (!subject) {
    throw new AppError("Subject not found", 404);
  }
  if (subject.tutorId !== tutor.id) {
    throw new AppError("You can only delete your own subjects", 403);
  }
  return await prisma.tutorSubject.delete({
    where: {
      id
    }
  });
};
var subjectService = {
  getAllSubject,
  createSubject,
  updateSubject,
  deleteSubject
};

// src/app/modules/subject/subject.controller.ts
var getAllSubject2 = catchAsync(
  async (req, res) => {
    const result = await subjectService.getAllSubject();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Retrieved subjects successfully",
      data: result
    });
  }
);
var createSubject2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await subjectService.createSubject(user, payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Subject created successfully",
      data: result
    });
  }
);
var updateSubject2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const { subjectId } = req.params;
    const payload = req.body;
    const result = await subjectService.updateSubject(user, subjectId, payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Subject updated successfully",
      data: result
    });
  }
);
var deleteSubject2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const { subjectId } = req.params;
    await subjectService.deleteSubject(user, subjectId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Subject deleted successfully"
    });
  }
);
var subjectController = {
  getAllSubject: getAllSubject2,
  createSubject: createSubject2,
  updateSubject: updateSubject2,
  deleteSubject: deleteSubject2
};

// src/app/modules/subject/subject.route.ts
var router7 = express7.Router();
router7.post("/", authentication_default("TUTOR" /* TUTOR */), subjectController.createSubject);
router7.get("/", authentication_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), subjectController.getAllSubject);
router7.put(
  "/:subjectId",
  authentication_default("TUTOR" /* TUTOR */),
  subjectController.updateSubject
);
router7.delete(
  "/:subjectId",
  authentication_default("TUTOR" /* TUTOR */),
  subjectController.deleteSubject
);
var tutorSubjectRoutes = router7;

// src/app/routes/index.ts
var router8 = Router();
router8.use("/auth", authRoutes);
router8.use("/tutors", tutorRoutes);
router8.use("/categories", categoryRoutes);
router8.use("/tutor-subjects", tutorSubjectRoutes);
router8.use("/users", userRoutes);
router8.use("/bookings", bookingRoutes);
router8.use("/reviews", reviewRoutes);
var IndexRoutes = router8;

// src/app.ts
var app = express8();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express8.json());
app.use(cookieParser());
app.all("/api/auth/", toNodeHandler(auth));
app.use("/api/v1", IndexRoutes);
app.use("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
