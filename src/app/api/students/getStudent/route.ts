import { connectToDB } from "@/db/mongo";
import { authOptions } from "@/lib/auth";
import Student from "@/models/Student_Registration";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.log(session.user.id);
    const userId = session.user.id;
    const student = await Student.findOne({userId: userId});
    console.log(student);
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      student,
      student ? { status: 200 } : { status: 404 },
    );
  } catch (error) {
    console.error(error); 
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
