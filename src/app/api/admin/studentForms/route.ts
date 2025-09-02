import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const studentsForm = await Student.find({}, "-__v");

    return NextResponse.json({
      message: "Successfully fetched submitted forms",
      status: 200,
      "students" : studentsForm, // Include all students in the response
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error in fetching form data",
      status: 500,
    });
  }
}
