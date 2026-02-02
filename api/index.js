// src/app.ts
import express7 from "express";
import cors from "cors";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel Booking {\n  id           String        @id @default(uuid())\n  user_id      String\n  tutor_id     String\n  session_date DateTime\n  start_time   DateTime\n  end_time     DateTime\n  price        Decimal       @db.Decimal(10, 2)\n  status       BookingStatus @default(PENDING)\n  created_at   DateTime      @default(now())\n  updated_at   DateTime      @updatedAt\n}\n\nmodel Category {\n  id         String   @id @default(uuid())\n  name       String\n  subject    String[]\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  booking_id String\n  user_id    String\n  tutor_id   String\n  comment    String   @db.Text\n  rating     Int      @default(0)\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Tutor {\n  id                  String   @id @default(uuid())\n  user_id             String   @unique\n  bio                 String?  @db.Text\n  hourly_rate         Decimal? @default(0) @db.Decimal(10, 2)\n  experience_years    Decimal? @default(0) @db.Decimal(10, 2)\n  education           String?\n  category_id         String?\n  avg_rating          Decimal? @default(0) @db.Decimal(10, 2)\n  avilable_start_time DateTime\n  avilable_end_time   DateTime\n  user                User     @relation(fields: [user_id], references: [id])\n  created_at          DateTime @default(now())\n  updated_at          DateTime @updatedAt\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  role          String    @default("student")\n  is_banned     Boolean   @default(false)\n  school        String?\n  age           Int?\n  address       String?\n  phone         String?\n  tutor         Tutor?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"session_date","kind":"scalar","type":"DateTime"},{"name":"start_time","kind":"scalar","type":"DateTime"},{"name":"end_time","kind":"scalar","type":"DateTime"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"booking_id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"tutor_id","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":null},"Tutor":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourly_rate","kind":"scalar","type":"Decimal"},{"name":"experience_years","kind":"scalar","type":"Decimal"},{"name":"education","kind":"scalar","type":"String"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"avg_rating","kind":"scalar","type":"Decimal"},{"name":"avilable_start_time","kind":"scalar","type":"DateTime"},{"name":"avilable_end_time","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TutorToUser"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"scalar","type":"String"},{"name":"is_banned","kind":"scalar","type":"Boolean"},{"name":"school","kind":"scalar","type":"String"},{"name":"age","kind":"scalar","type":"Int"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"Tutor","relationName":"TutorToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
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

// generated/prisma/internal/prismaNamespace.ts
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

// generated/prisma/enums.ts
var BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student" /* STUDENT */,
        required: true
      },
      is_banned: {
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

// src/modules/tutor/tutor.router.ts
import express from "express";

// src/helpers/appError.ts
var AppError = class extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};

// src/modules/tutor/tutor.service.ts
var getAllTutors = async () => {
  return await prisma.tutor.findMany({
    include: {
      user: true
    }
  });
};
var getTutorById = async (id) => {
  return await prisma.tutor.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
};
var createProfile = async (user, data) => {
  const { id, role } = user;
  if (!user) {
    throw new AppError("User not authenticated", 401);
  }
  if (role !== "tutor" /* TUTOR */) {
    throw new AppError("Access denied. Tutor only.", 403);
  }
  const exists = await prisma.tutor.findUnique({
    where: { user_id: id }
  });
  if (exists) {
    throw new AppError("Profile already exists", 400);
  }
  return await prisma.tutor.create({
    data: {
      user_id: id,
      bio: data.bio ?? null,
      hourly_rate: data.hourly_rate ?? null,
      experience_years: data.experience_years ?? null,
      education: data.education ?? null,
      category_id: data.category_id ?? null,
      avg_rating: data.avg_rating ?? null,
      avilable_start_time: data.avilable_start_time,
      avilable_end_time: data.avilable_end_time
    }
  });
};
var updateProfile = async (user, data) => {
  const { id, role } = user;
  const tutor = await prisma.tutor.findUniqueOrThrow({
    where: { user_id: id }
  });
  if (role === "tutor" /* TUTOR */ && tutor.user_id !== id) {
    throw new AppError("Access denied.", 403);
  }
  return await prisma.tutor.update({
    where: { user_id: id },
    data
  });
};
var updateAvialablity = async (user, data) => {
  const { id, role } = user;
  const tutor = await prisma.tutor.findUniqueOrThrow({
    where: { user_id: id }
  });
  if (role === "tutor" /* TUTOR */ && tutor.user_id !== id) {
    throw new AppError("Access denied.", 403);
  }
  return await prisma.tutor.update({
    where: { user_id: id },
    data: {
      avilable_start_time: data.avilable_start_time,
      avilable_end_time: data.avilable_end_time
    }
  });
};
var tutorService = {
  getAllTutors,
  createProfile,
  updateProfile,
  updateAvialablity,
  getTutorById
};

// src/modules/tutor/tutor.controller.ts
var getAllTutors2 = async (req, res) => {
  try {
    const result = await tutorService.getAllTutors();
    res.status(200).json({
      success: false,
      message: "Retrive all Tutors succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var getTutorById2 = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const result = await tutorService.getTutorById(tutorId);
    res.status(200).json({
      success: false,
      message: "Retrive succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var createProfile2 = async (req, res) => {
  try {
    const user = req?.user;
    const payload = req.body;
    const result = await tutorService.createProfile(user, payload);
    res.status(201).json({
      success: false,
      message: "Profile created succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateProfile2 = async (req, res) => {
  try {
    const user = req?.user;
    const { tutorId } = req?.params;
    const payload = req.body;
    const result = await tutorService.updateProfile(user, payload);
    res.status(200).json({
      success: false,
      message: "Profile update succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateAvialablity2 = async (req, res) => {
  try {
    const user = req?.user;
    const payload = req.body;
    const result = await tutorService.updateProfile(user, payload);
    res.status(200).json({
      success: false,
      message: "Update availablity succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var tutorController = {
  getAllTutors: getAllTutors2,
  createProfile: createProfile2,
  updateProfile: updateProfile2,
  updateAvialablity: updateAvialablity2,
  getTutorById: getTutorById2
};

// src/middleware/authentication.ts
import { fromNodeHeaders } from "better-auth/node";
var authentication = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      });
      if (!session || !session.user) {
        throw new AppError(
          "Authentication failed. Please log in to access this resource.",
          401
        );
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role
      };
      if (roles.length && !roles.includes(req.user?.role)) {
        throw new AppError(
          "Forbidden: You do not have the necessary permissions to access this resource.",
          403
        );
      }
      next();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        });
      }
    }
  };
};
var authentication_default = authentication;

// src/modules/tutor/tutor.router.ts
var router = express.Router();
router.get("/tutors", tutorController.getAllTutors);
router.get("/tutors/:tutorId", tutorController.getTutorById);
router.post(
  "/tutor/profile",
  authentication_default("tutor" /* TUTOR */),
  tutorController.createProfile
);
router.put(
  "/tutor/profile",
  authentication_default("tutor" /* TUTOR */),
  tutorController.updateProfile
);
router.put(
  "/tutor/availability",
  authentication_default("tutor" /* TUTOR */),
  tutorController.updateAvialablity
);
var tutorRouter = router;

// src/modules/user/currentUser.ts
import express2 from "express";
import { fromNodeHeaders as fromNodeHeaders2 } from "better-auth/node";
var router2 = express2.Router();
router2.get("/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders2(req.headers)
  });
  return res.json(session);
});
var currentUser = router2;

// src/modules/category/category.router.ts
import express3 from "express";

// src/modules/category/category.service.ts
var getAllCategory = async () => {
  return await prisma.category.findMany();
};
var getSingleCategory = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id
    }
  });
};
var createCategory = async (data) => {
  return await prisma.category.create({
    data
  });
};
var updateCategory = async (id, data) => {
  return await prisma.category.update({
    where: {
      id
    },
    data
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

// src/modules/category/category.controller.ts
var getAllCategory2 = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    res.status(200).json({
      success: true,
      message: "Retrive categories successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var getSingleCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.getSingleCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Retrive category successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var createCategory2 = async (req, res) => {
  try {
    const payload = req.body;
    const result = await categoryService.createCategory(payload);
    res.status(201).json({
      success: true,
      message: "Category created Successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const payload = req.body;
    const result = await categoryService.updateCategory(categoryId, payload);
    res.status(200).json({
      success: true,
      message: "Update category successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await categoryService.deleteCategory(categoryId);
    res.status(200).json({
      success: true,
      message: "Delete category successfully"
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.router.ts
var router3 = express3.Router();
router3.post("/", categoryController.createCategory);
router3.get("/", categoryController.getAllCategory);
router3.get("/:categoryId", categoryController.getSingleCategory);
router3.put("/:categoryId", authentication_default("admin" /* ADMIN */), categoryController.updateCategory);
router3.delete("/:categoryId", authentication_default("admin" /* ADMIN */), categoryController.deleteCategory);
var categoryRouter = router3;

// src/modules/user/user.router.ts
import express4 from "express";

// src/modules/user/user.service.ts
var getAllUser = async (user) => {
  if ("admin" /* ADMIN */ !== user.role) {
    throw new AppError("Access Denied!", 403);
  }
  return await prisma.user.findMany({});
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
    delete data.is_banned;
    throw new AppError("You have no permission to update User status", 401);
  }
  return await prisma.user.update({
    where: {
      id
    },
    data
  });
};
var updateUserStatus = async (id, user, data) => {
  if ("admin" /* ADMIN */ !== user.role) {
    throw new AppError("Access Denied!", 403);
  }
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      is_banned: data.is_banned
    }
  });
};
var userService = {
  getAllUser,
  updateUserStatus,
  updateUser
};

// src/modules/user/user.controller.ts
var getAllUser2 = async (req, res) => {
  try {
    const user = req?.user;
    const result = await userService.getAllUser(user);
    res.status(200).json({
      success: false,
      message: "Retrive all Users succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateUser2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req?.user;
    const payload = req.body;
    const isAdmin = user.role === "admin" /* ADMIN */;
    const result = await userService.updateUser(userId, user, payload, isAdmin);
    res.status(200).json({
      success: false,
      message: "Update User succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = req?.user;
    const payload = req.body;
    const result = await userService.updateUserStatus(userId, user, payload);
    res.status(200).json({
      success: false,
      message: "Update User succussfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var userController = {
  getAllUser: getAllUser2,
  updateUserStatus: updateUserStatus2,
  updateUser: updateUser2
};

// src/modules/user/user.router.ts
var router4 = express4.Router();
router4.get("/admin/users", authentication_default("admin" /* ADMIN */), userController.getAllUser);
router4.put("/users/:userId", authentication_default("admin" /* ADMIN */, "student" /* STUDENT */, "tutor" /* TUTOR */), userController.updateUser);
router4.put("/admin/users/:userId", authentication_default("admin" /* ADMIN */), userController.updateUserStatus);
var userRouter = router4;

// src/modules/booking/booking.router.ts
import express5 from "express";

// src/modules/booking/booking.service.ts
var getAllBooking = async (user) => {
  if (user.role === "student" /* STUDENT */) {
    return await prisma.booking.findMany({
      where: {
        user_id: user.id
      }
    });
  }
  if (user.role === "admin" /* ADMIN */) {
    return await prisma.booking.findMany({});
  }
};
var getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: {
      id
    }
  });
};
var createBooking = async (user, data) => {
  if (!user) {
    throw new AppError("Login required.", 401);
  }
  if (user.role !== "student" /* STUDENT */) {
    throw new AppError("Only students can book", 403);
  }
  const tutor = await prisma.tutor.findUnique({
    where: {
      id: data.tutor_id
    },
    select: {
      hourly_rate: true,
      avilable_start_time: true,
      avilable_end_time: true
    }
  });
  if (!tutor) {
    throw new AppError("Tutor not found", 404);
  }
  const start = new Date(data.start_time);
  const end = new Date(data.end_time);
  const sessionDate = new Date(data.session_date);
  const startHours = start.getHours();
  const endHours = end.getHours();
  if (startHours < new Date(tutor.avilable_start_time).getHours() || endHours > new Date(tutor.avilable_end_time).getHours()) {
    throw new AppError("Outside tutor working hours", 400);
  }
  const durationHours = (end.getTime() - start.getTime()) / (1e3 * 60 * 60);
  const price = tutor.hourly_rate?.toNumber() * durationHours;
  const checkavialable = await prisma.booking.findFirst({
    where: {
      tutor_id: data.tutor_id,
      session_date: sessionDate,
      status: { not: BookingStatus.CANCELLED },
      AND: [{ start_time: { lt: end } }, { end_time: { gt: start } }]
    }
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
      status: BookingStatus.CONFIRMED
    }
  });
};
var updateBookingStatus = async (bookId, user, status) => {
  const bookingData = await prisma.booking.findUnique({
    where: { id: bookId }
  });
  if (!bookingData) throw new AppError("Booking not found", 404);
  let tutorProfile;
  if (user.role === "tutor" /* TUTOR */) {
    tutorProfile = await prisma.tutor.findUnique({
      where: { user_id: user.id },
      select: { id: true }
    });
    if (!tutorProfile) throw new AppError("Tutor profile not found", 404);
  }
  if (user.role === "student" /* STUDENT */) {
    if (bookingData?.user_id !== user.id) {
      throw new AppError("Not your booking", 403);
    }
    if (status !== BookingStatus.CANCELLED) {
      throw new AppError("Students can only cancel bookings", 403);
    }
  }
  if (user.role === "tutor" /* TUTOR */) {
    if (bookingData.tutor_id !== tutorProfile.id) {
      throw new AppError("Not your session", 403);
    }
    if (status !== BookingStatus.COMPLETED) {
      throw new AppError("Invalid action for tutor", 403);
    }
  }
  await prisma.booking.update({
    where: { id: bookId },
    data: { status }
  });
};
var bookingService = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBookingStatus
};

// src/modules/booking/booking.controller.ts
var getAllBooking2 = async (req, res) => {
  try {
    const user = req?.user;
    const result = await bookingService.getAllBooking(user);
    res.status(200).json({
      success: true,
      message: "Retrive all bookings successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var getBookingById2 = async (req, res) => {
  try {
    const { bookingId } = req?.params;
    const result = await bookingService.getBookingById(bookingId);
    res.status(200).json({
      success: true,
      message: "Retrive bookings successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var createBooking2 = async (req, res) => {
  try {
    const user = req?.user;
    const payload = req.body;
    const result = await bookingService.createBooking(user, payload);
    res.status(201).json({
      success: true,
      message: "Booked successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var updateBookingStatus2 = async (req, res) => {
  try {
    const user = req?.user;
    const { bookingId } = req?.params;
    const { status } = req.body;
    const result = await bookingService.updateBookingStatus(
      bookingId,
      user,
      status
    );
    res.status(200).json({
      success: true,
      message: "Update booking status successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var bookingController = {
  createBooking: createBooking2,
  getAllBooking: getAllBooking2,
  getBookingById: getBookingById2,
  updateBookingStatus: updateBookingStatus2
};

// src/modules/booking/booking.router.ts
var router5 = express5.Router();
router5.get(
  "/",
  authentication_default("admin" /* ADMIN */, "student" /* STUDENT */),
  bookingController.getAllBooking
);
router5.get("/:bookingId", authentication_default(), bookingController.getBookingById);
router5.post("/", bookingController.createBooking);
router5.put(
  "/:bookingId",
  authentication_default("admin" /* ADMIN */, "tutor" /* TUTOR */, "student" /* STUDENT */),
  bookingController.updateBookingStatus
);
var bookingRouter = router5;

// src/modules/review/review.router.ts
import express6 from "express";

// src/modules/review/review.service.ts
var createReview = async (user, data) => {
  if (user.role !== "student" /* STUDENT */) {
    throw new AppError("Only students can review", 403);
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: data.booking_id
    },
    select: {
      user_id: true,
      status: true,
      tutor_id: true
    }
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
      403
    );
  }
  const alreadyReview = await prisma.review.findFirst({
    where: {
      booking_id: data.booking_id
    }
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
      comment: data.comment
    }
  });
  const stats = await prisma.review.aggregate({
    where: { tutor_id: booking.tutor_id },
    _avg: { rating: true },
    _count: { rating: true }
  });
  await prisma.tutor.update({
    where: { id: booking.tutor_id },
    data: {
      avg_rating: stats._avg.rating ?? 0
    }
  });
  return review;
};
var reviewService = {
  createReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const user = req?.user;
    const payload = req.body;
    const result = await reviewService.createReview(user, payload);
    res.status(201).json({
      success: true,
      message: "Review Create successfully",
      data: result
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
};
var reviewController = {
  createReview: createReview2
};

// src/modules/review/review.router.ts
var router6 = express6.Router();
router6.post(
  "/",
  authentication_default("student" /* STUDENT */),
  reviewController.createReview
);
var reviewRouter = router6;

// src/app.ts
var app = express7();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express7.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/v1", tutorRouter);
app.use("/api", currentUser);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1/bookings", authentication_default(), bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/", (req, res) => {
  res.send("Hello World!");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
