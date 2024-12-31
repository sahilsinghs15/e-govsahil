import { dbConnection } from "@/lib/dbConnection";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();
export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);

        const student = await Student.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if (!student) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(student);

        student.isVerified = true;
        student.verifyToken = undefined;
        student.verifyTokenExpiry = undefined;
        await student.save();
        
        return NextResponse.json({
            message: "Student Email verified successfully",
            success: true
        })


    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in Verifying email:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Verify Email Function:",error);
            throw new Error("unexpected error occurred while Verifying Email");
        }
    }

}