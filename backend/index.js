// import packages
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// import utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan alamat frontend kamu
    credentials: true, // Mengizinkan pengiriman cookies jika diperlukan
  })
);

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
