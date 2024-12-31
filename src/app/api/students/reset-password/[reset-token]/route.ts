import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnection } from "@/lib/dbConnection";

dbConnection();
export async function POST(request: NextRequest , {params} : {params : {resetToken : string}}){
    try {
        const {resetToken} = params;
        const {studentPassword} = await request.json();

        if(!resetToken || !studentPassword){
            return NextResponse.json({error : "Reset token and Student password is mandatory to change password"} , {status:400});
        }

        const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        const student = await Student.findOne({
            forgotPasswordToken : forgotPasswordToken,
            forgotPasswordExpiry:{ $gt: Date.now()},
        })

        if(!student){
            return NextResponse.json({error:"Token is not valid or it is expired!"},{status:400});
        }

        student.studentPassword = studentPassword;
        student.forgotPasswordToken = undefined;
        student.forgotPasswordExpiry = undefined;
        await student.save();

        return NextResponse.json({
            success : true,
            message: "Password has been successfully reset.",
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in Reseting Password:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Reset Password Function:",error);
            throw new Error("unexpected error occurred while Reseting Password");
        }
    }

}