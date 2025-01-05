import { NextResponse } from "next/server";
import { connectToDB } from "@/db/mongo";
import Wallet from "@/models/Wallet";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { studentId, amount } = await req.json();

    if (!studentId || !amount) {
      return NextResponse.json(
        { error: "Student ID and amount are required" },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "A valid positive amount is required" },
        { status: 400 }
      );
    }

    // Update the wallet balance for the student
    const wallet = await Wallet.findOneAndUpdate(
      { studentId },
      { $inc: { balance: amount } },
      { new: true } // Return the updated wallet document
    );

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet not found for the student" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Funds added successfully",
        updatedBalance: wallet.balance,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
