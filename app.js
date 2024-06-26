import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import brandRoute from "./routes/brandRoute";
import categoryRoute from "./routes/categoryRoute";
import fragranceNoteRoute from "./routes/fragranceNoteRoute";
import productRoute from "./routes/productRoute";
import collectionRoute from "./routes/collectionRoute";
import couponOrderRoute from "./routes/couponOrderRoute";
import googleRoute from "./routes/googleRoute";
import orderRoute from "./routes/orderRoute";
import passport from "./controllers/googleController";
import newRoute from "./routes/newsRoute";
import infoRoute from "./routes/infoRoute";
import contactRoute from "./routes/contactRoute";
import session from "express-session";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
const PORT = process.env.PORT || 9000;
app.use(express.json());

app.use(
  session({
    secret: process.env.YOUR_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/collection", collectionRoute);
app.use("/api/fragrancenote", fragranceNoteRoute);
app.use("/api/google", googleRoute);
app.use("/api/couponorder", couponOrderRoute);
app.use("/api/order", orderRoute);
app.use("/api/news", newRoute);
app.use("/api/info", infoRoute);
app.use("/api/contact", contactRoute);
