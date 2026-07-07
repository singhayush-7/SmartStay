import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";


import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import ApiError from "./utils/ApiError.js";

const app = express();





app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));





app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SmartStay API 🚀",
  });
});





app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);




app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});





app.use((err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error(err.stack);
  console.error("===========================");

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;