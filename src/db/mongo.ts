import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI as string;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URI environment variable");
}

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1)
    return mongoose.connection.asPromise();

  return mongoose.connect(MONGO_URL);
};
