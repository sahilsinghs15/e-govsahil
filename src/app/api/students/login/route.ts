import { dbConnection } from "@/lib/dbConnection";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

const cookieOption : object = {
    secure : false,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
}

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {studentEmail, studentPassword} = reqBody;
        console.log(reqBody);

        if(!studentEmail || !studentPassword){
            return NextResponse.json({error : "Student Email and Student Password Are mandatory!"} , {status : 400});
        }

        //check if user exists
        const student = await Student.findOne({studentEmail}).select('+studentPassword');
        if(!student){
            return NextResponse.json({error: "Student does not exist"}, {status: 400})
        }
        
        //check if password is correct
        
        if(!(student && (await student.comparePassword(studentPassword)))){
            return NextResponse.json({error : "Email and Password Does not Match!"} , {status:400});
        }
       
        //creating token data
        const token = await student.generateJWTToken();

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token,cookieOption);
        return response;

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in Login:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Login Function:",error);
            throw new Error("unexpected error occurred while Login");
        }
    }
}