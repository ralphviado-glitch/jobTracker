import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/UserRoute.js";
import jobRoutes from "./src/routes/JobRoute.js";

dotenv.config();

console.log("PORT:", process.env.PORT);
console.log("MONGO URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);


const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    
    "job-tracker-snowy-nine.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.log(err));

