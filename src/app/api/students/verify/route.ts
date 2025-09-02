import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { studentId, action } = await req.json();

    if (!studentId || !action) {
      return NextResponse.json(
        { error: "StudentId and action are required" },
        { status: 400 }
      );
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    if (action === "accept") {
      await Student.findByIdAndUpdate(studentId, { accepted: true });
      return NextResponse.json(
        { message: "Student form accepted successfully" },
        { status: 200 }
      );
    } else if (action === "reject") {
      await Student.findByIdAndDelete(studentId);
      return NextResponse.json(
        { message: "Student form rejected successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
