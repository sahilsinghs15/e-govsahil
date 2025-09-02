import mongoose, { Schema, Document, model } from "mongoose";

// Define the Receipt interface
export interface IReceipt extends Document {
  studentId: mongoose.Types.ObjectId; 
  amount: number;
  description: string; 
  createdAt: Date; 
  updatedAt: Date; 
}

// Define the schema for the Receipt model
const ReceiptSchema: Schema = new Schema<IReceipt>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, 
    },
    description: {
      type: String,
      required: true,
      trim: true, 
    },
  },
  {
    timestamps: true, 
  }
);

// Check if the model already exists (to avoid recompilation issues in Next.js)
const Receipt = mongoose.models.Receipt || model<IReceipt>("Receipt", ReceiptSchema);

export default Receipt;
