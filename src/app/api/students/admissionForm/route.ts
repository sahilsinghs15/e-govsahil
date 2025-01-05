import { NextResponse } from "next/server";
import { connectToDB } from "@/db/mongo";
import Student from "@/models/Student_Registration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: Request) {
  try {
    await connectToDB();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Student must be logged in to submit the form" }, { status: 400 });
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Student is not logged in" }, { status: 404 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found in the Database" }, { status: 404 });
    }

    const { name, email, phone, dob, gender, course } = await req.json();
    console.log("Payload received:", { name, email, phone, dob, gender, course });
 
    if (!name || !email || !phone || !dob || !gender || !course) {
      return NextResponse.json({ error: "All fields are required, including the marksheet" }, { status: 400 });
    }
    
    const studentForm = await Student.create({
      userId: userId,
      name,
      email,
      phone,
      dob,
      gender,
      course,
    });

    user.filledForm = true;
    await user.save();

    return NextResponse.json({
      message: "Form submitted successfully",
      userId,
      studentForm,
    }, { status: 201 });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
