import { NextResponse } from "next/server";
import Student from "@/models/Student_Registration";
import { connectToDB } from "@/db/mongo";
import Receipt from "@/models/FeeReciept";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { studentId, amount, description } = await req.json();

    if (!studentId || !amount || !description) {
      return NextResponse.json(
        { error: "Student ID, amount, and description are required" },
        { status: 400 }
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const feeReciept = new Receipt({
      studentId,
      amount,
      description
    })

    await feeReciept.save();

    return NextResponse.json(
      { message: "Fee receipt generated successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
