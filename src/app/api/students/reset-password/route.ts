
import { sendEmail } from "@/helpers/mailerHelper";
import { dbConnection } from "@/lib/dbConnection";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {studentEmail} = reqBody;

    if(!studentEmail){
        return NextResponse.json({error: "Student Email is mandatory to reset the password"},{status:400} );
    }

    const student = await Student.findOne(studentEmail);

    try {
        await sendEmail({studentEmail, emailType: "RESET", studentId: student._id});

        return NextResponse.json({
            success: true,
            message: `Reset password token has been sent to ${studentEmail} successfully`,
        })

    } catch (error) {

        // If some error happened we need to clear the forgotPassword* fields in our DB
        student.forgotPasswordToken = undefined;
        student.forgotPasswordExpiry = undefined;

        await student.save();
        if (error instanceof Error) {
            console.error("Error in Verifying email:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Verify Email Function:",error);
            throw new Error("unexpected error occurred while Verifying Email");
        }
    }

}