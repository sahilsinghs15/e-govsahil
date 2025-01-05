import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGO_URL environment variable");
}

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return mongoose.connection.asPromise();
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
};