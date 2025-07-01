import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
// import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// const allowedOrigins = ["https://gym-buddy-client.onrender.com"];

app.use(express.json());
app.use(cookieParser());
// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://gym-buddy-client.onrender.com",
];

// Configure CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200, // For legacy browser support
  allowedHeaders: ["Content-Type"],
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// Api endpoints
app.get("/", (req, res) => res.send("Api working "));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
