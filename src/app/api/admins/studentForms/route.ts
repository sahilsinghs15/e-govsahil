import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { NextResponse } from "next/server";

connectToDB();
export async function GET(){
    const studentsForm = await Student.find();
    return NextResponse.json({
        message : "Successfully fetched submitted forms",
        status : 200,
        studentForms : studentsForm
    })
}

export async function DELETE(req: Request) {
  try {
    // Parse the request URL to extract query parameters
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { message: "Form ID is required" },
        { status: 400 }
      );
    }

    // Check if the form exists and delete it
    const deletedForm = await Student.findByIdAndDelete(studentId);

    if (!deletedForm) {
      return NextResponse.json(
        { message: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Form successfully deleted", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "error in deleting form data" },
      { status: 500 }
    );
  }
}