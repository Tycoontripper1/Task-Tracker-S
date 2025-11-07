import mongoose from "mongoose";

export const dbConnection = async () => {
  const mongoURI =
    "mongodb+srv://bombhack:bombhack123@cluster0.1l3tsiz.mongodb.net/express";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
};
